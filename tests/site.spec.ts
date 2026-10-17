import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const personal = true;

test("complete visitor journey, responsive layout, accessibility and honest demo", async ({
  page,
}) => {
  const errors: string[] = [];
  const failed: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("requestfailed", (request) => failed.push(request.url()));
  page.on("response", (response) => {
    if (response.status() >= 400)
      failed.push(response.status() + " " + response.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page).toHaveTitle(/концепт/);
  const width = page.viewportSize()!.width;
  const overflow = () =>
    page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
  expect(await overflow()).toBe(false);
  const targets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links.map((a) => a.getAttribute("href")).filter((h) => h !== "#"),
    );
  for (const target of targets)
    await expect(page.locator(target!)).toHaveCount(1);
  await page.keyboard.press("Tab");
  await expect(page.getByText("Перейти к содержанию")).toBeFocused();
  await page.keyboard.press("Enter");
  if (width <= 800) {
    const menu = page.locator('button[aria-controls="mobile-menu"]');
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.locator("#mobile-menu a").first().click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  }
  if (personal) {
    const tab = page.getByRole("tab", { name: "Лично" });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText(
      "Встреча за одним столом",
    );
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Письменно" })).toBeFocused();
    await expect(page.getByRole("tabpanel")).toContainText(
      "Вопрос, который требует изучения",
    );
    await page.keyboard.press("Home");
    await expect(page.getByRole("tabpanel")).toContainText(
      "Разговор из удобного места",
    );
  } else {
    const practice = page.locator(".practice").nth(1);
    await practice.locator("summary").click();
    await expect(practice).toHaveAttribute("open", "");
    await expect(practice.locator(".practice-content")).toBeVisible();
    await practice.locator("summary").click();
    await expect(practice).not.toHaveAttribute("open", "");
  }
  const faq = page.locator("#faq details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator("p")).toBeVisible();
  await faq.locator("summary").click();
  await expect(faq).not.toHaveAttribute("open", "");
  const form = page.locator("form");
  await expect(
    form.locator('input:not([type="radio"]),textarea,input[type="file"]'),
  ).toHaveCount(0);
  let requestsAfterSubmit = 0;
  page.on("request", () => requestsAfterSubmit++);
  if (personal) {
    await page.locator("#topic").selectOption("Наследство");
    await page.getByRole("radio", { name: "Письменно" }).check();
  } else {
    await page.locator("#practice-select").selectOption("Разрешение споров");
    await page.locator("#format-select").selectOption("Личная встреча");
  }
  await form
    .getByRole("button", {
      name: personal ? "Собрать план встречи" : "Посмотреть следующий шаг",
    })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Ничего не отправлено и не сохранено.",
  );
  if (personal)
    await expect(page.getByRole("status")).toContainText(
      "Наследство · письменно",
    );
  expect(requestsAfterSubmit).toBe(0);
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0);
  expect(await page.context().cookies()).toHaveLength(0);
  expect(await overflow()).toBe(false);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(axe.violations, JSON.stringify(axe.violations, null, 2)).toEqual([]);
  const names = await new AxeBuilder({ page })
    .withRules(["label-content-name-mismatch"])
    .analyze();
  expect(names.violations).toEqual([]);
  const legal = page.getByRole("button", {
    name: personal ? "О концепте и данных" : "Информация о концепте",
  });
  await legal.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const dialogAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogAxe.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(legal).toBeFocused();
  await legal.click();
  await page
    .getByRole("button", {
      name: personal ? "Понятно, закрыть" : "Закрыть пояснение",
    })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("status")).not.toContainText(
    "Ничего не отправлено и не сохранено.",
  );
  if (width === 1440 || width === 390) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `docs/screenshots/${width === 1440 ? "desktop" : "mobile"}-full.png`,
      fullPage: true,
    });
    if (width === 1440) {
      await page.screenshot({ path: "docs/screenshots/desktop-hero.png" });
      await page
        .locator(personal ? "#expertise" : "#practices")
        .scrollIntoViewIfNeeded();
      await page.screenshot({ path: "docs/screenshots/desktop-detail.png" });
    }
  }
  await page.goto("/#faq");
  await expect(page.locator("#faq")).toBeInViewport();
  expect(await overflow()).toBe(false);
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});
