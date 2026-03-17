import { test, expect } from "@playwright/test";

test("The home page has the correct title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Soluciones Vecinales/i);
});

test("The home page has two logos", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const images = await page.getByRole("img", { name: /Logo/i }).all();

  expect(images).toHaveLength(2);
});
