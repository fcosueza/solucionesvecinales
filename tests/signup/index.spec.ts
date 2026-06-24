import { test, expect } from "@playwright/test";

const URL = "http://localhost:3000/signup";
const toastElement = "[data-sonner-toaster] li";

test.describe("sign-up page navigation", () => {
  test("Any user can navigate to the sign-up page", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveURL(URL);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("The sign-up page has the correct title", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveTitle(/Soluciones Vecinales/i);
  });
});

test.describe("header content", () => {
  test("The header contains the link to the home page", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
  });

  test("The header contains the login button linking to /login", async ({ page }) => {
    await page.goto(URL);

    const signInButton = page.getByRole("button", { name: "Iniciar sesión" });

    await expect(signInButton).toBeVisible();
    await signInButton.click();
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});

test.describe("form content", () => {
  test("The sign-up form is visible", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("form")).toBeVisible();
  });

  test("The form contains all required fields", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#surname")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#repeat")).toBeVisible();
  });

  test("The form contains both user roles as radio options", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#tenant")).toBeVisible();
    await expect(page.locator("#admin")).toBeVisible();
  });

  test("The tenant role is selected by default", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#tenant")).toBeChecked();
    await expect(page.locator("#admin")).not.toBeChecked();
  });

  test("The form contains the submit button", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("button", { name: "Enviar" })).toBeVisible();
  });

  test("The page contains the link to the login page", async ({ page }) => {
    await page.goto(URL);

    const signInLink = page.getByRole("link", { name: "inicia sesión" });

    await expect(signInLink).toBeVisible();
    await expect(signInLink).toHaveAttribute("href", "/login");
  });
});

test.describe("form validation with invalid data", () => {
  test("Shows an error toast when submitting the form with all fields empty", async ({ page }) => {
    await page.goto(URL);

    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement)).toHaveCount(0);
    expect(await page.locator("#name").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(true);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(
      true
    );
  });

  test("Shows field errors when first name and surname have fewer than 2 characters", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("a");
    await page.locator("#surname").fill("b");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("Shows an error toast with an invalid email format", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("ValidName");
    await page.locator("#surname").fill("ValidSurname");
    await page.locator("#email").fill("invalid-email-format");
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement)).toHaveCount(0);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.typeMismatch)).toBe(
      true
    );
  });

  test("Shows an error toast when the password has fewer than 15 characters", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("ValidName");
    await page.locator("#surname").fill("ValidSurname");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("short");
    await page.locator("#repeat").fill("short");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(toastElement).first()).toContainText(/Form data validation failed/i);
  });

  test("Shows an error toast when passwords do not match", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("ValidName");
    await page.locator("#surname").fill("ValidSurname");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("differentpassword456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(toastElement).first()).toContainText(/Form data validation failed/i);
  });

  test("Shows a repeat-password field error when passwords do not match", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("ValidName");
    await page.locator("#surname").fill("ValidSurname");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("differentpassword456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.getByText(/Las contraseñas deben coincidir/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe("form submission with valid data", () => {
  test("Shows a success toast and redirects to /login when registering a user successfully", async ({ page }) => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    await page.goto(URL);

    await page.locator("#name").fill("ValidName");
    await page.locator("#surname").fill("ValidSurname");
    await page.locator("#tenant").check();
    await page.locator("#email").fill(uniqueEmail);
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(toastElement).first()).toContainText(/User created successfully/i);
    await expect(page).toHaveURL("http://localhost:3000/login", { timeout: 8000 });
  });

  test("Can register a user as an admin successfully", async ({ page }) => {
    const uniqueEmail = `adminuser_${Date.now()}@example.com`;

    await page.goto(URL);

    await page.locator("#name").fill("ValidAdminName");
    await page.locator("#surname").fill("ValidAdminSurname");
    await page.locator("#admin").check();
    await page.locator("#email").fill(uniqueEmail);
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(toastElement).first()).toContainText(/User created successfully/i);
    await expect(page).toHaveURL("http://localhost:3000/login", { timeout: 8000 });
  });

  test("Shows an error toast when trying to register an existing email", async ({ page }) => {
    const duplicateEmail = `duplicate_${Date.now()}@example.com`;

    // Registra el usuario por primera vez
    await page.goto(URL);
    await page.locator("#name").fill("ValidName");
    await page.locator("#surname").fill("ValidSurname");
    await page.locator("#email").fill(duplicateEmail);
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();
    await expect(page).toHaveURL("http://localhost:3000/login", { timeout: 8000 });

    // Intenta registrarlo de nuevo con el mismo correo
    await page.goto(URL);
    await page.locator("#name").fill("AnotherValidName");
    await page.locator("#surname").fill("AnotherValidSurname");
    await page.locator("#email").fill(duplicateEmail);
    await page.locator("#password").fill("validpassword123456");
    await page.locator("#repeat").fill("validpassword123456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(toastElement).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(toastElement).first()).toContainText(/Failed to create user/i);
    await expect(page).toHaveURL(URL);
  });
});
