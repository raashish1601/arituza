import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseRoute = "/portfolio/senlek-thai";

test.describe("Senlek Thai - Homepage", () => {
  test("should load homepage and display hero content", async ({ page }) => {
    await page.goto(baseRoute);

    await expect(page.getByRole("heading", { level: 1, name: /bold flavors/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /view our menu/i }).first()).toBeVisible();

    const orderLinks = page.getByRole("link", { name: /order online/i });
    await expect(orderLinks.first()).toBeVisible();
    await expect(orderLinks.first()).toHaveAttribute("href", /toasttab\.com/);
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

    await page.getByLabel("Senlek Thai primary").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(`${baseRoute}/about`);
    await expect(page.getByRole("heading", { level: 1, name: /restaurant built on tradition/i })).toBeVisible();

    await page.getByLabel("Senlek Thai primary").getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(`${baseRoute}/contact`);
    await expect(page.getByRole("heading", { level: 1, name: "Contact & Hours" })).toBeVisible();
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

  test("should display correct menu item details", async ({ page }) => {
    await page.goto(`${baseRoute}/menu`);
    const padThaiCard = page.locator('[data-testid="menu-card"]').filter({
      has: page.getByRole("heading", { name: "Pad Thai" })
    });

    await expect(padThaiCard).toContainText("Pad Thai");
    await expect(padThaiCard).toContainText("$15.00");
    await expect(padThaiCard).toContainText("tamarind sauce");
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
    await expect(mobileMenu.getByRole("link", { name: "About" })).toBeVisible();
    await expect(mobileMenu.getByRole("link", { name: "Contact" })).toBeVisible();
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

  test("should have semantic HTML structure", async ({ page }) => {
    for (const route of [baseRoute, `${baseRoute}/menu`, `${baseRoute}/about`, `${baseRoute}/contact`]) {
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
