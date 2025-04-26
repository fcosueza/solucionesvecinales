import { test, expect } from "@playwright/test";

test("tiene título", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Soluciones Vecinales/);
});

test("tiene logo", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});
