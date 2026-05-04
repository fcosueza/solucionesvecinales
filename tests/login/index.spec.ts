import { test, expect } from "@playwright/test";
import { INQUILINO_CREDENTIALS } from "../auth/constants";

const URL = "http://localhost:3000/login";
const elementoToast = "[data-sonner-toaster] li";

test.describe("navegación página de inicio de sesión", () => {
  test("Cualquier usuario puede navegar a la página de inicio de sesión", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveURL(URL);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("La página de inicio de sesión tiene el título correcto", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveTitle(/Soluciones Vecinales/i);
  });
});

test.describe("contenido de la cabecera", () => {
  test("La cabecera contiene el enlace a la página de inicio", async ({ page }) => {
    await page.goto(URL);

    const enlaceInicio = page.getByRole("link", { name: "Inicio" }).first();

    await expect(enlaceInicio).toBeVisible();
    await expect(enlaceInicio).toHaveAttribute("href", "/");
  });

  test("La cabecera contiene el botón de registro que enlaza a /signup", async ({ page }) => {
    await page.goto(URL);

    const botonRegistro = page.getByRole("link", { name: "Regístrate" }).first();

    await expect(botonRegistro).toBeVisible();
    await expect(botonRegistro).toHaveAttribute("href", "/signup");
  });
});

test.describe("contenido del formulario", () => {
  test("El formulario de inicio de sesión es visible", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("form")).toBeVisible();
  });

  test("El formulario contiene el campo de correo", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#email")).toBeVisible();
  });

  test("El formulario contiene el campo de contraseña", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#password")).toBeVisible();
  });

  test("El formulario contiene el botón de envío", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("button", { name: "Enviar" })).toBeVisible();
  });

  test("La página contiene el enlace a la página de registro", async ({ page }) => {
    await page.goto(URL);

    const enlaceRegistro = page.getByRole("link", { name: "Regístrate" }).last();

    await expect(enlaceRegistro).toBeVisible();
    await expect(enlaceRegistro).toHaveAttribute("href", "/signup");
  });
});

test.describe("validación del formulario con datos incorrectos", () => {
  test("Muestra un toast de error al enviar el formulario con todos los campos vacíos", async ({ page }) => {
    await page.goto(URL);

    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast)).toHaveCount(0);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validationMessage)).not.toBe("");
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(
      true
    );
    expect(await page.locator("#password").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(
      true
    );
  });

  test("Muestra un toast de error con un correo con formato incorrecto", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill("correoincorrecto");
    await page.locator("#password").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast)).toHaveCount(0);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.typeMismatch)).toBe(
      true
    );
  });

  test("Muestra un toast de error cuando la contraseña tiene menos de 15 caracteres", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("corta");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(elementoToast).first()).toContainText(/formulario/i);
  });

  test("Muestra un error de campo y toast de error con un correo no registrado", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill("noexiste@example.com");
    await page.locator("#password").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(elementoToast).first()).toContainText(/formulario/i);
    await expect(page.getByText(/No existe ningún usuario con ese correo/i)).toBeVisible({ timeout: 5000 });
  });

  test("Muestra un error de campo y toast de error con contraseña incorrecta para un usuario existente", async ({
    page
  }) => {
    await page.goto(URL);

    await page.locator("#email").fill(INQUILINO_CREDENTIALS.email);
    await page.locator("#password").fill("contrasenaincorrecta123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(elementoToast).first()).toContainText(/formulario/i);
    await expect(page.getByText(/La contraseña no es válida para este usuario/i)).toBeVisible({ timeout: 5000 });
  });

  test("Mantiene el correo en el campo después de un error de contraseña", async ({ page }) => {
    await page.goto(URL);

    const correo = INQUILINO_CREDENTIALS.email;

    await page.locator("#email").fill(correo);
    await page.locator("#password").fill("contrasenaincorrecta123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#email")).toHaveValue(correo);
    await expect(page.locator("#password")).toHaveValue("");
  });
});

test.describe("inicio de sesión con datos correctos", () => {
  test("Redirige a /communities al iniciar sesión como inquilino", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#email").fill(INQUILINO_CREDENTIALS.email);
    await page.locator("#password").fill(INQUILINO_CREDENTIALS.password);
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(elementoToast).first()).toContainText(/correctos/i);
    await expect(page).toHaveURL("http://localhost:3000/communities", { timeout: 8000 });
  });
});
