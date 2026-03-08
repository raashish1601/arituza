import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, value] = arg.split("=");
    return [key.replace(/^--/, ""), value ?? "true"];
  })
);

const outputDir = path.resolve(args.get("out") ?? "qa/artifacts");
const port = Number(args.get("port") ?? "3200");
const baseUrl = `http://127.0.0.1:${port}`;

const sectionTargets = [
  { name: "hero", selector: ".hero" },
  { name: "services", selector: "#services" },
  { name: "outcomes", selector: "#why" },
  { name: "process", selector: "#process" },
  { name: "industries", selector: "#industries" },
  { name: "testimonials", selector: "#testimonials" },
  { name: "faq", selector: "#faq" },
  { name: "contact", selector: "#contact" },
  { name: "footer", selector: ".site-footer" }
];

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080, isMobile: false },
  { name: "laptop-1366", width: 1366, height: 900, isMobile: false },
  { name: "tablet-834", width: 834, height: 1112, isMobile: false },
  { name: "mobile-390", width: 390, height: 844, isMobile: true }
];

function spawnServer() {
  if (process.platform === "win32") {
    return spawn(
      "cmd",
      ["/c", "npm", "run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)],
      { stdio: "pipe" }
    );
  }

  return spawn("npm", ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
    stdio: "pipe"
  });
}

function stopServer(server) {
  if (!server || server.killed) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
    return;
  }

  server.kill("SIGTERM");
}

async function waitForServer(timeoutMs = 90_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(baseUrl, { method: "GET" });
      if (response.ok) {
        return;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

async function stabilizePage(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
      .logo-row, .testimonial-track {
        transform: none !important;
      }
    `
  });

  await page.evaluate(() => {
    document.querySelectorAll("[data-counter]").forEach((node) => {
      const target = Number(node.getAttribute("data-counter") || "0");
      const decimals = Number.isInteger(target) ? 0 : 1;
      const prefix = node.getAttribute("data-prefix") || "";
      const suffix = node.getAttribute("data-suffix") || "";
      const value = decimals > 0 ? target.toFixed(decimals) : Math.round(target).toString();
      node.textContent = `${prefix}${value}${suffix}`;
    });
  });
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function captureScreenshots(browser) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile
    });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await stabilizePage(page);
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-full.png`),
      fullPage: true
    });

    for (const section of sectionTargets) {
      const locator = page.locator(section.selector).first();
      if ((await locator.count()) === 0) {
        continue;
      }
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(80);
      await locator.screenshot({
        path: path.join(outputDir, `${viewport.name}-${section.name}.png`)
      });
    }

    if (viewport.isMobile) {
      await page.locator(".menu-toggle").click();
      await page.waitForTimeout(100);
      await page.screenshot({
        path: path.join(outputDir, `${viewport.name}-menu-open.png`),
        fullPage: true
      });
      await page.locator(".drawer-close").click();
    }

    await context.close();
  }
}

async function runE2E(browser) {
  const report = {
    passed: true,
    checks: []
  };

  const addCheck = (name, passed, detail = "") => {
    report.checks.push({ name, passed, detail });
    if (!passed) {
      report.passed = false;
    }
  };

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const navTargets = [
    { key: "services", id: "services" },
    { key: "industries", id: "industries" },
    { key: "process", id: "process" },
    { key: "faq", id: "faq" },
    { key: "contact", id: "contact" }
  ];

  for (const target of navTargets) {
    try {
      await page.locator(`.desktop-nav a[data-nav="${target.key}"]`).click();
      await page.waitForTimeout(260);
      const hashMatches = (await page.evaluate(() => window.location.hash)) === `#${target.id}`;
      addCheck(`desktop-nav-${target.key}`, hashMatches);
    } catch (error) {
      addCheck(`desktop-nav-${target.key}`, false, String(error));
    }
  }

  try {
    const count = await page.locator(".service-item").count();
    const max = Math.min(count, 10);
    let successClicks = 0;
    for (let i = 0; i < max; i++) {
      const clicked = await page.evaluate((index) => {
        const node = document.querySelector(`.service-item[data-index="${index}"]`);
        if (!node) return false;
        node.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        return true;
      }, i);
      if (clicked) {
        successClicks += 1;
      }
      await page.waitForTimeout(80);
    }
    addCheck("desktop-service-tabs-clickable", count > 0 && successClicks > 0);
  } catch (error) {
    addCheck("desktop-service-tabs-clickable", false, String(error));
  }

  try {
    const faqItems = page.locator(".faq-grid details");
    const count = await faqItems.count();
    for (let i = 0; i < count; i++) {
      await faqItems.nth(i).locator("summary").click();
      await page.waitForTimeout(40);
    }
    addCheck("faq-toggle-clickable", count > 0);
  } catch (error) {
    addCheck("faq-toggle-clickable", false, String(error));
  }

  try {
    await page.locator('input[name="fullName"]').fill("QA User");
    await page.locator('input[name="businessName"]').fill("Arituza QA");
    await page.locator('input[name="email"]').fill("qa@example.com");
    await page.locator('input[name="phone"]').fill("5551234567");
    await page.locator('select[name="service"]').selectOption({ index: 1 });
    await page.locator('textarea[name="message"]').fill("Testing end-to-end interactions and form behavior.");
    addCheck("contact-form-fill", true);
  } catch (error) {
    addCheck("contact-form-fill", false, String(error));
  }

  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(300);

  const mobileLinks = ["services", "industries", "process", "faq", "contact"];
  for (const link of mobileLinks) {
    try {
      await mobilePage.locator(".menu-toggle").click();
      if (link === "contact") {
        await mobilePage.locator('.mobile-nav a[href="#contact"]:not(.mobile-cta)').click();
      } else {
        await mobilePage.locator(`.mobile-nav a[href="#${link}"]`).click();
      }
      await mobilePage.waitForTimeout(280);
      const hashMatches = (await mobilePage.evaluate(() => window.location.hash)) === `#${link}`;
      addCheck(`mobile-nav-${link}`, hashMatches);
    } catch (error) {
      addCheck(`mobile-nav-${link}`, false, String(error));
    }
  }

  try {
    if (await mobilePage.locator(".mobile-drawer.open").count()) {
      await mobilePage.locator(".drawer-close").click();
    }
    await mobilePage.locator("#services").scrollIntoViewIfNeeded();
    const accordionButtons = mobilePage.locator(".accordion-button");
    const count = await accordionButtons.count();
    const max = Math.min(count, 8);
    for (let i = 0; i < max; i++) {
      await accordionButtons.nth(i).click();
      await mobilePage.waitForTimeout(80);
    }
    addCheck("mobile-accordion-clickable", count > 0);
  } catch (error) {
    addCheck("mobile-accordion-clickable", false, String(error));
  }

  await mobile.close();

  await fs.writeFile(path.join(outputDir, "e2e-report.json"), JSON.stringify(report, null, 2), "utf8");

  if (!report.passed) {
    throw new Error("One or more E2E checks failed. See e2e-report.json.");
  }
}

async function main() {
  await ensureDir(outputDir);
  const server = spawnServer();
  const logs = [];

  server.stdout.on("data", (chunk) => logs.push(chunk.toString()));
  server.stderr.on("data", (chunk) => logs.push(chunk.toString()));

  try {
    await waitForServer();
    const browser = await chromium.launch({ headless: true });
    try {
      await captureScreenshots(browser);
      await runE2E(browser);
    } finally {
      await browser.close();
    }
  } finally {
    stopServer(server);
    await fs.writeFile(path.join(outputDir, "server.log"), logs.join(""), "utf8");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
