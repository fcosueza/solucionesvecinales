import { test, expect } from "@playwright/test";

test("La página de inicio tiene el título correcto", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Soluciones Vecinales/i);
});

test("La página de inicio tiene dos logotipos", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const images = await page.getByRole("img", { name: /Logo/i }).all();

  expect(images).toHaveLength(2);
});
