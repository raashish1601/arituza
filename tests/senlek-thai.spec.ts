import type { Page, TestInfo } from "@playwright/test";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseRoute = "/portfolio/senlek-thai";
const coreRoutes = [
  baseRoute,
  `${baseRoute}/menu`,
  `${baseRoute}/catering`,
  `${baseRoute}/gift-cards`,
  `${baseRoute}/rewards`,
  `${baseRoute}/contact`
];

async function captureScreenshot(page: Page, testInfo: TestInfo, name: string) {
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: true,
    animations: "disabled"
  });
}

async function expectPopupUrl(
  popupPromise: Promise<Page>,
  matcher: RegExp
) {
  const popup = await popupPromise;
  await popup.waitForLoadState("domcontentloaded").catch(() => undefined);
  await expect
    .poll(async () => popup.url(), {
      timeout: 15_000
    })
    .toMatch(matcher);
  await popup.close();
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("Senlek Thai - Homepage", () => {
  test("should load homepage and display hero content", async ({ page }, testInfo) => {
    await page.goto(baseRoute);

    await expect(page.getByRole("heading", { level: 1, name: /bold flavors/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /view our menu/i }).first()).toBeVisible();
    await expect(page.getByRole("main").getByTestId("restaurant-status").first()).toBeVisible();

    const orderLinks = page.getByRole("link", { name: /order online/i });
    await expect(orderLinks.first()).toBeVisible();
    await expect(orderLinks.first()).toHaveAttribute("href", /toasttab\.com/);

    await captureScreenshot(page, testInfo, "homepage-hero.png");
  });

  test("should display featured dishes section", async ({ page }) => {
    await page.goto(baseRoute);
    await page.locator("#featured-dishes").scrollIntoViewIfNeeded();

    const cards = page.locator('[data-testid="featured-dish-card"]');
    await expect(cards).toHaveCount(6);

    for (let index = 0; index < 4; index += 1) {
      const card = cards.nth(index);
      await expect(card.locator("h3")).toBeVisible();
      await expect(card.getByText(/^\$\d+\.\d{2}$/)).toBeVisible();
      await expect(card.locator("p").nth(1)).toBeVisible();
    }
  });

  test("should display guest experience section", async ({ page }) => {
    await page.goto(baseRoute);
    await page.getByText(/Three polished guest journeys/i).scrollIntoViewIfNeeded();

    await expect(page.getByRole("link", { name: "Explore Catering" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View Gift Options" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open Flavor Passport" })).toBeVisible();
  });

  test("should display testimonials", async ({ page }) => {
    await page.goto(baseRoute);

    const testimonialsSection = page.locator("#testimonials");
    await expect(testimonialsSection).toBeVisible();
    await expect(testimonialsSection.getByText(/DoorDash Review|Yelp Review/)).toHaveCount(8);
  });

  test("should display location and hours", async ({ page }) => {
    await page.goto(baseRoute);
    const locationSection = page.locator("#location-hours");
    await locationSection.scrollIntoViewIfNeeded();

    await expect(locationSection.getByText(/^1843 Montgomery Hwy, Suite 107$/)).toBeVisible();
    await expect(locationSection.getByRole("link", { name: "(205) 937-8099" })).toBeVisible();

    const rows = page.locator("#location-hours table tbody tr");
    await expect(rows).toHaveCount(7);
    await expect(rows.filter({ hasText: "Sunday" }).getByText("CLOSED")).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto(baseRoute);
    const desktopNav = page.getByLabel("Senlek Thai primary");

    await desktopNav.getByRole("link", { name: "Menu" }).click();
    await expect(page).toHaveURL(`${baseRoute}/menu`);
    await expect(page.getByRole("heading", { level: 1, name: "Our Menu" })).toBeVisible();

    await page.getByLabel("Senlek Thai primary").getByRole("link", { name: "Catering" }).click();
    await expect(page).toHaveURL(`${baseRoute}/catering`);
    await expect(page.getByRole("heading", { level: 1, name: /Catering That Feels Thoughtful/i })).toBeVisible();

    await page.getByLabel("Senlek Thai primary").getByRole("link", { name: "Rewards" }).click();
    await expect(page).toHaveURL(`${baseRoute}/rewards`);
    await expect(page.getByRole("heading", { level: 1, name: /Repeat-Guest Experience/i })).toBeVisible();

    await page.getByLabel("Senlek Thai primary").getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(`${baseRoute}/contact`);
    await expect(page.getByRole("heading", { level: 1, name: "Contact & Hours" })).toBeVisible();
  });

  test("should show a route progress bar during internal navigation", async ({ page }) => {
    await page.goto(baseRoute);

    const progressBar = page.getByTestId("route-progress-bar");
    await page.getByLabel("Senlek Thai primary").getByRole("link", { name: "Menu" }).click();
    await expect(progressBar).toBeVisible();
    await expect(page).toHaveURL(`${baseRoute}/menu`);
    await expect(progressBar).toBeHidden();
  });
});

test.describe("Senlek Thai - Menu Page", () => {
  test("should load menu page with all categories", async ({ page }) => {
    await page.goto(`${baseRoute}/menu`);

    for (const label of [
      "Appetizers",
      "Rice Dishes",
      "Noodle Soups",
      "Stir-Fry",
      "Curries",
      "Specialties",
      "Dessert & Drinks"
    ]) {
      await expect(page.getByRole("tab", { name: label })).toBeVisible();
    }
  });

  test("should filter menu items by category", async ({ page }) => {
    await page.goto(`${baseRoute}/menu`);

    await page.getByRole("tab", { name: "Appetizers" }).click();
    await expect(page.locator('[data-testid="menu-card"]')).toHaveCount(10);
    await expect(page.getByText(/^A1$/)).toBeVisible();
    await expect(page.getByText(/^A10$/)).toBeVisible();
    await expect(page.getByText(/^R1$/)).toHaveCount(0);

    await page.getByRole("tab", { name: "Rice Dishes" }).click();
    await expect(page.locator('[data-testid="menu-card"]')).toHaveCount(7);
    await expect(page.getByText(/^R1$/)).toBeVisible();
    await expect(page.getByText(/^R7$/)).toBeVisible();
    await expect(page.getByText(/^A1$/)).toHaveCount(0);
  });

  test("should support quick filters, spice filters, and clearing refinements", async ({ page }) => {
    await page.goto(`${baseRoute}/menu`);

    await page.getByRole("button", { name: "Seafood", exact: true }).click();
    await page.getByRole("button", { name: "Hot", exact: true }).click();
    await expect(page.getByText(/^A8$/)).toBeVisible();
    await expect(page.getByText(/^N3$/)).toBeVisible();
    await expect(page.getByText(/^SP7$/)).toBeVisible();
    await expect(page.getByText(/^R1$/)).toHaveCount(0);
    await expect(page.getByText(/^SP1$/)).toHaveCount(0);

    await page.getByRole("button", { name: /Clear refinements/i }).click();
    await expect(page.getByText(/^A1$/)).toBeVisible();
    await expect(page.getByText(/^DR6$/)).toBeVisible();
  });

  test("should support search, dish details, and saving favorites", async ({ page }, testInfo) => {
    await page.goto(`${baseRoute}/menu`);

    await page.getByLabel("Search the menu").fill("tamarind sauce");
    await expect(page.locator('[data-testid="menu-card"]')).toHaveCount(1);

    const padThaiCard = page.locator('[data-testid="menu-card"]').filter({
      has: page.getByRole("heading", { name: "Pad Thai" })
    });

    await padThaiCard.getByRole("button", { name: "Details" }).click();
    await expect(page.getByTestId("dish-detail-dialog")).toBeVisible();
    await expect(page.getByText("Best pairings")).toBeVisible();
    await captureScreenshot(page, testInfo, "menu-pad-thai-dialog.png");
    await page.getByRole("button", { name: /save to passport/i }).click();
    await page.getByRole("button", { name: /close dish details/i }).click();

    await page.goto(`${baseRoute}/rewards`);
    await expect(page.getByTestId("flavor-passport")).toContainText("Pad Thai");
  });

  test('should show all menu items when "All" tab is selected', async ({ page }) => {
    await page.goto(`${baseRoute}/menu`);
    await page.getByRole("tab", { name: "All" }).click();

    expect(await page.locator('[data-testid="menu-card"]').count()).toBeGreaterThanOrEqual(30);
  });
});

test.describe("Senlek Thai - About Page", () => {
  test("should load about page with story content", async ({ page }) => {
    await page.goto(`${baseRoute}/about`);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/tradition|story/i);
    await expect(page.getByText(/Owner Nop Sac-Uang spent/)).toBeVisible();
    await expect(page.getByText(/means thin rice noodles in Thai/)).toBeVisible();
  });
});

test.describe("Senlek Thai - Catering Page", () => {
  test("should display catering packages and planner output", async ({ page }, testInfo) => {
    await page.goto(`${baseRoute}/catering`);

    await expect(page.getByRole("heading", { level: 1, name: /Catering That Feels Thoughtful/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Drop-Off Lunch" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Thai Street Market Spread" })).toBeVisible();

    await page.getByLabel("Package direction").selectOption("signature-noodle-night");
    await page.getByLabel("Event type").fill("Community dinner");
    await page.getByLabel("Guest count").fill("25");
    await page.getByLabel("Service style").selectOption("Delivery");
    await page.getByLabel("Timing").fill("Saturday at 6:30 PM");
    await page.getByLabel("Notes for the team").fill("One vegetarian tray, one mild curry, and a Thai tea add-on.");
    await expect(page.getByTestId("catering-brief-preview")).toContainText("Guests: 25");
    await expect(page.getByTestId("catering-brief-preview")).toContainText("Community dinner");
    await page.getByRole("button", { name: /copy brief/i }).click();
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Start With Toast/i })).toHaveAttribute("href", /toasttab\.com/);

    await captureScreenshot(page, testInfo, "catering-planner.png");
  });
});

test.describe("Senlek Thai - Gift Cards Page", () => {
  test("should display flexible gift options with working links", async ({ page }, testInfo) => {
    await page.goto(`${baseRoute}/gift-cards`);

    await expect(page.getByRole("heading", { level: 1, name: /Dinner Out/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dinner for Two" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Send This Gift/i }).first()).toHaveAttribute("href", /giftly\.com/);
    await expect(page.getByText(/not an official merchant-issued Senlek house card/i)).toBeVisible();

    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: /Send This Gift/i }).first().click();
    await expectPopupUrl(popupPromise, /giftly\.com/);
    await captureScreenshot(page, testInfo, "gift-cards.png");
  });
});

test.describe("Senlek Thai - Rewards Page", () => {
  test("should load rewards page and show flavor passport controls", async ({ page }) => {
    await page.goto(`${baseRoute}/rewards`);

    await expect(page.getByRole("heading", { level: 1, name: /Repeat-Guest Experience/i })).toBeVisible();
    await expect(page.getByText(/No favorites saved yet/i)).toBeVisible();
    await expect(page.getByLabel("Spice profile")).toBeVisible();
    await expect(page.getByLabel("Usual order mood")).toBeVisible();
  });

  test("should persist preference changes and allow favorite removal", async ({ page }, testInfo) => {
    await page.goto(`${baseRoute}/menu`);
    const padThaiCard = page.locator('[data-testid="menu-card"]').filter({
      has: page.getByRole("heading", { name: "Pad Thai" })
    });

    await padThaiCard.getByRole("button", { name: "Details" }).click();
    await page.getByRole("button", { name: /save to passport/i }).click();
    await page.getByRole("button", { name: /close dish details/i }).click();

    await page.goto(`${baseRoute}/rewards`);
    await page.getByLabel("Spice profile").selectOption("Bring the chili");
    await page.getByLabel("Usual order mood").selectOption("Delivery night in");

    await expect(page.getByTestId("flavor-passport")).toContainText("Bring the chili");
    await expect(page.getByTestId("flavor-passport")).toContainText("Delivery night in");
    await expect(page.getByTestId("flavor-passport")).toContainText("Pad Thai");

    await page.getByRole("button", { name: /Remove Pad Thai from flavor passport/i }).click();
    await expect(page.getByText(/No favorites saved yet/i)).toBeVisible();
    await captureScreenshot(page, testInfo, "rewards-passport.png");
  });
});

test.describe("Senlek Thai - Contact Page", () => {
  test("should display all contact information", async ({ page }) => {
    await page.goto(`${baseRoute}/contact`);
    const main = page.getByRole("main");

    await expect(main.getByText(/1843 Montgomery Hwy, Suite 107/)).toBeVisible();
    await expect(main.getByRole("link", { name: "(205) 937-8099" })).toHaveAttribute("href", "tel:+12059378099");
    await expect(page.locator('iframe[title*="location map"]')).toBeVisible();
    await expect(main.getByRole("cell", { name: "Monday" })).toBeVisible();
    await expect(main.getByRole("cell", { name: "Sunday" })).toBeVisible();
  });

  test("should display online ordering links", async ({ page }) => {
    await page.goto(`${baseRoute}/contact`);

    await expect(page.getByRole("link", { name: /Toast/i })).toHaveAttribute("href", /toasttab\.com/);
    await expect(page.getByRole("link", { name: /DoorDash/i })).toHaveAttribute("href", /doordash\.com/);
    await expect(page.getByRole("link", { name: /Uber Eats/i })).toHaveAttribute("href", /ubereats\.com/);
  });

  test("should support directions and social clicks", async ({ page }, testInfo) => {
    await page.goto(`${baseRoute}/contact`);

    let popupPromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Get Directions" }).click();
    await expectPopupUrl(popupPromise, /google\.(com|co\.)/);

    popupPromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Instagram" }).first().click();
    await expectPopupUrl(popupPromise, /instagram\.com/);

    await captureScreenshot(page, testInfo, "contact-page.png");
  });

  test("should have working FAQ accordion", async ({ page }) => {
    await page.goto(`${baseRoute}/contact`);

    const trigger = page.getByRole("button", { name: "Do you offer delivery?" });
    const answer = page.getByText(
      "Yes! Order through DoorDash, Uber Eats, or directly through our Toast ordering page."
    );

    await expect(answer).toBeVisible();
    await trigger.click();
    await expect(answer).not.toBeVisible();
    await trigger.click();
    await expect(answer).toBeVisible();
  });
});

test.describe("Senlek Thai - Responsive Design", () => {
  test("should show mobile hamburger menu on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(baseRoute);
    const header = page.locator("header");

    const toggle = page.getByRole("button", { name: /open menu/i });
    await expect(toggle).toBeVisible();
    await expect(header.getByRole("link", { name: "Menu" })).toHaveCount(0);

    await toggle.click();
    const mobileMenu = page.locator("#senlek-mobile-menu");
    await expect(mobileMenu.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Menu" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Catering" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Gift Cards" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Rewards" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("should support sticky order bar interactions on mobile", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(baseRoute);

    const stickyOrderBar = page.getByTestId("sticky-order-bar");
    await expect(stickyOrderBar).toBeVisible();
    await expect(stickyOrderBar.getByRole("link", { name: "Pickup" })).toBeVisible();
    await expect(stickyOrderBar.getByRole("link", { name: "Visit" })).toBeVisible();

    const popupPromise = page.waitForEvent("popup");
    await stickyOrderBar.getByRole("link", { name: "Visit" }).click();
    await expectPopupUrl(popupPromise, /google\.(com|co\.)/);
    await captureScreenshot(page, testInfo, "mobile-home.png");
  });

  test("should stack content vertically on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(baseRoute);
    await page.locator("#about-preview").scrollIntoViewIfNeeded();

    const copyBox = await page.locator('[data-testid="about-preview-copy"]').boundingBox();
    const imageBox = await page.locator('[data-testid="about-preview-image"]').boundingBox();

    expect(copyBox).not.toBeNull();
    expect(imageBox).not.toBeNull();
    expect((imageBox?.y ?? 0) > (copyBox?.y ?? 0)).toBeTruthy();
  });

  test("should avoid horizontal overflow across Senlek routes on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    for (const route of coreRoutes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await expectNoHorizontalOverflow(page);
    }
  });
});

test.describe("Senlek Thai - SEO", () => {
  test("should have correct meta tags on homepage", async ({ page }) => {
    await page.goto(baseRoute);

    await expect(page).toHaveTitle(/Senlek Thai/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Hoover/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Senlek Thai/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /Hoover/);
  });

  test("should have JSON-LD structured data", async ({ page }) => {
    await page.goto(baseRoute);

    const ldJson = await page.locator('script[type="application/ld+json"]').first().textContent();
    const parsed = JSON.parse(ldJson ?? "{}");

    expect(parsed["@type"]).toBe("Restaurant");
    expect(parsed.name).toBe("Senlek Thai Rice & Noodles");
    expect(parsed.telephone).toBe("+12059378099");
  });

  test("should load key pages without console or page errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    for (const route of coreRoutes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test("should have semantic HTML structure", async ({ page }) => {
    for (const route of [
      baseRoute,
      `${baseRoute}/menu`,
      `${baseRoute}/about`,
      `${baseRoute}/catering`,
      `${baseRoute}/gift-cards`,
      `${baseRoute}/rewards`,
      `${baseRoute}/contact`
    ]) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("nav")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
    }
  });
});

test.describe("Senlek Thai - Accessibility", () => {
  test("should have alt text on all images", async ({ page }) => {
    await page.goto(baseRoute);

    const images = page.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      await expect(images.nth(index)).toHaveAttribute("alt", /.+/);
    }
  });

  test("should have sufficient color contrast", async ({ page }) => {
    await page.goto(baseRoute);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const colorViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === "color-contrast"
    );

    expect(colorViolations).toEqual([]);
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto(baseRoute);

    const desktopNav = page.getByLabel("Senlek Thai primary");
    const homeLink = desktopNav.getByRole("link", { name: "Home" });
    const menuLink = desktopNav.getByRole("link", { name: "Menu" });

    for (let index = 0; index < 8; index += 1) {
      await page.keyboard.press("Tab");
      if (await homeLink.evaluate((node) => node === document.activeElement)) {
        break;
      }
    }

    await expect(homeLink).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(menuLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(`${baseRoute}/menu`);
  });
});
