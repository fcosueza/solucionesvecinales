import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import { ADMIN_CREDENTIALS, ADMIN_FILE, AUTH_DIR, INQUILINO_CREDENTIALS, INQUILINO_FILE } from "./constants";

const BASE_URL = "http://localhost:3000";

setup.describe.configure({ mode: "serial" });

async function iniciarSesion(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto(`${BASE_URL}/login`);
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: "Enviar" }).click();
  await expect(page).toHaveURL(/communities|backoffice/, { timeout: 8000 });
}

setup("guardar sesión de inquilino", async ({ page }) => {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  await iniciarSesion(page, INQUILINO_CREDENTIALS.email, INQUILINO_CREDENTIALS.password);
  await page.context().storageState({ path: INQUILINO_FILE });
});

setup("guardar sesión de administrador", async ({ page }) => {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  await iniciarSesion(page, ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password);
  await page.context().storageState({ path: ADMIN_FILE });
});
