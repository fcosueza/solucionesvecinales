import { test, expect } from "@playwright/test";
import { TENANT_CREDENTIALS } from "../setup/constants";

const URL = "http://localhost:3000/login";
const toastElement = "[data-sonner-toaster] li";

test.describe("login page navigation", () => {
  test("Any user can navigate to the login page", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveURL(URL);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("The login page has the correct title", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveTitle(/Soluciones Vecinales/i);
  });
});

test.describe("header content", () => {
  test("The header contains the link to the home page", async ({ page }) => {
    await page.goto(URL);

    const homePageLink = page.getByRole("link", { name: "Inicio" }).first();

    await expect(homePageLink).toBeVisible();
    await expect(homePageLink).toHaveAttribute("href", "/");
  });

  test("The header contains the sign-up button linking to /signup", async ({ page }) => {
    await page.goto(URL);

    const signUpButton = page.getByRole("link", { name: "Regístrate" }).first();

    await expect(signUpButton).toBeVisible();
    await expect(signUpButton).toHaveAttribute("href", "/signup");
  });
});

test.describe("form content", () => {
  test("The login form is visible", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("form")).toBeVisible();
  });

  test("The form contains the email field", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#email")).toBeVisible();
  });

  test("The form contains the password field", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#password")).toBeVisible();
  });

  test("The form contains the submit button", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("button", { name: "Enviar" })).toBeVisible();
  });

  test("The page contains the link to the sign-up page", async ({ page }) => {
    await page.goto(URL);

    const signupLink = page.getByRole("link", { name: "Regístrate" }).last();

    await expect(signupLink).toBeVisible();
    await expect(signupLink).toHaveAttribute("href", "/signup");
  });
});

test.describe("form validation with invalid data", () => {
  test("Shows an error toast when submitting the form with all fields empty", async ({ page }) => {
    await page.goto(URL);

    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement)).toHaveCount(0);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validationMessage)).not.toBe("");
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(
      true
    );
    expect(await page.locator("#password").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(
      true
    );
  });

  test("Shows an error toast with an invalid email format", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill("invalid-email-format");
    await page.locator("#password").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement)).toHaveCount(0);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.typeMismatch)).toBe(
      true
    );
  });

  test("Shows an error toast when the password has fewer than 15 characters", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("corta");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(toastElement).first()).toContainText(/Validación de datos del formulario fallida/i);
  });

  test("Shows a field error and an error toast with an unregistered email", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill("noexiste@example.com");
    await page.locator("#password").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(toastElement).first()).toContainText(/Validación de datos del formulario fallida/i);
    await expect(page.getByText(/No existe un usuario con este correo electrónico en la base de datos/i)).toBeVisible({
      timeout: 5000
    });
  });

  test("Shows a field error and an error toast with an incorrect password for an existing user", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill(TENANT_CREDENTIALS.email);
    await page.locator("#password").fill("invalidpassword123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(toastElement).first()).toContainText(/Validación de datos del formulario fallida/i);
    await expect(page.getByText(/La contraseña no es válida para este usuario/i)).toBeVisible({ timeout: 5000 });
  });

  test("Keeps the email in the field after a password error", async ({ page }) => {
    await page.goto(URL);

    const email = TENANT_CREDENTIALS.email;

    await page.locator("#email").fill(email);
    await page.locator("#password").fill("invalidpassword123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#email")).toHaveValue(email);
    await expect(page.locator("#password")).toHaveValue("");
  });
});

test.describe("login with valid data", () => {
  test("Redirects to /communities when logging in as a tenant", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill(TENANT_CREDENTIALS.email);
    await page.locator("#password").fill(TENANT_CREDENTIALS.password);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(toastElement).first()).toContainText(/correctos/i);
    await expect(page).toHaveURL("http://localhost:3000/communities", { timeout: 8000 });
  });
});
