import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import { ADMIN_CREDENTIALS, ADMIN_FILE, AUTH_DIR, TENANT_CREDENTIALS, TENANT_FILE } from "./constants";

const BASE_URL = "http://localhost:3000";

setup.describe.configure({ mode: "serial" });

async function iniciarSesion(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto(`${BASE_URL}/login`);
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Enviar" }).click();
  await expect(page).toHaveURL(/communities|backoffice/, { timeout: 8000 });
}

setup("save tenant session", async ({ page }) => {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  await iniciarSesion(page, TENANT_CREDENTIALS.email, TENANT_CREDENTIALS.password);
  await page.context().storageState({ path: TENANT_FILE });
});

setup("save admin session", async ({ page }) => {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  await iniciarSesion(page, ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password);
  await page.context().storageState({ path: ADMIN_FILE });
});
