import { test, expect } from "@playwright/test";

const URL = "http://localhost:3000/signup";
const elementoToast = "[data-sonner-toaster] li";

test.describe("navegación página de registro", () => {
  test("Cualquier usuario puede navegar a la página de registro", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveURL(URL);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("La página de registro tiene el título correcto", async ({ page }) => {
    await page.goto(URL);

    await expect(page).toHaveTitle(/Soluciones Vecinales/i);
  });
});

test.describe("contenido de la cabecera", () => {
  test("La cabecera contiene el enlace a la página de inicio", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
  });

  test("La cabecera contiene el botón de iniciar sesión que enlaza a /login", async ({ page }) => {
    await page.goto(URL);

    const botonInicioSesion = page.getByRole("button", { name: "Iniciar sesión" });

    await expect(botonInicioSesion).toBeVisible();
    await botonInicioSesion.click();
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});

test.describe("contenido del formulario", () => {
  test("El formulario de registro es visible", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("form")).toBeVisible();
  });

  test("El formulario contiene todos los campos requeridos", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#surname")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#repeat")).toBeVisible();
  });

  test("El formulario contiene los dos roles de usuario como opciones de radio", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#tenant")).toBeVisible();
    await expect(page.locator("#admin")).toBeVisible();
  });

  test("El rol inquilino está seleccionado por defecto", async ({ page }) => {
    await page.goto(URL);

    await expect(page.locator("#tenant")).toBeChecked();
    await expect(page.locator("#admin")).not.toBeChecked();
  });

  test("El formulario contiene el botón de envío", async ({ page }) => {
    await page.goto(URL);

    await expect(page.getByRole("button", { name: "Enviar" })).toBeVisible();
  });

  test("La página contiene el enlace a la página de inicio de sesión", async ({ page }) => {
    await page.goto(URL);

    const enlaceInicioSesion = page.getByRole("link", { name: "inicia sesión" });

    await expect(enlaceInicioSesion).toBeVisible();
    await expect(enlaceInicioSesion).toHaveAttribute("href", "/login");
  });
});

test.describe("validación del formulario con datos incorrectos", () => {
  test("Muestra un toast de error al enviar el formulario con todos los campos vacíos", async ({ page }) => {
    await page.goto(URL);

    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast)).toHaveCount(0);
    expect(await page.locator("#name").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(true);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(
      true
    );
  });

  test("Muestra errores de campo cuando el nombre y apellidos tienen menos de 2 caracteres", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("a");
    await page.locator("#surname").fill("b");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("Muestra un toast de error con un correo con formato incorrecto", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("NombreValido");
    await page.locator("#surname").fill("ApellidoValido");
    await page.locator("#email").fill("correoincorrecto");
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast)).toHaveCount(0);
    expect(await page.locator("#email").evaluate(input => (input as HTMLInputElement).validity.typeMismatch)).toBe(
      true
    );
  });

  test("Muestra un toast de error cuando la contraseña tiene menos de 15 caracteres", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("NombreValido");
    await page.locator("#surname").fill("ApellidoValido");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("corta");
    await page.locator("#repeat").fill("corta");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(elementoToast).first()).toContainText(/formulario/i);
  });

  test("Muestra un toast de error cuando las contraseñas no coinciden", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("NombreValido");
    await page.locator("#surname").fill("ApellidoValido");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenadiferente456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator(elementoToast).first()).toContainText(/formulario/i);
  });

  test("Muestra un error de campo de contraseña repetida cuando las contraseñas no coinciden", async ({ page }) => {
    await page.goto(URL);

    await page.locator("#name").fill("NombreValido");
    await page.locator("#surname").fill("ApellidoValido");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenadiferente456");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.getByText(/Las contraseñas deben coincidir/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe("envío del formulario con datos correctos", () => {
  test("Muestra un toast de éxito y redirige a /login al registrar un usuario correctamente", async ({ page }) => {
    const correoUnico = `testuser_${Date.now()}@example.com`;

    await page.goto(URL);

    await page.locator("#name").fill("NombreValido");
    await page.locator("#surname").fill("ApellidoValido");
    await page.locator("#tenant").check();
    await page.locator("#email").fill(correoUnico);
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(elementoToast).first()).toContainText(/creado correctamente/i);
    await expect(page).toHaveURL("http://localhost:3000/login", { timeout: 8000 });
  });

  test("Se puede registrar un usuario como administrador correctamente", async ({ page }) => {
    const correoUnico = `adminuser_${Date.now()}@example.com`;

    await page.goto(URL);

    await page.locator("#name").fill("AdminValido");
    await page.locator("#surname").fill("ApellidoAdmin");
    await page.locator("#admin").check();
    await page.locator("#email").fill(correoUnico);
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(elementoToast).first()).toContainText(/creado correctamente/i);
    await expect(page).toHaveURL("http://localhost:3000/login", { timeout: 8000 });
  });

  test("Muestra un toast de error al intentar registrar un correo ya existente", async ({ page }) => {
    const correoDuplicado = `duplicate_${Date.now()}@example.com`;

    // Registra el usuario por primera vez
    await page.goto(URL);
    await page.locator("#name").fill("NombreValido");
    await page.locator("#surname").fill("ApellidoValido");
    await page.locator("#email").fill(correoDuplicado);
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();
    await expect(page).toHaveURL("http://localhost:3000/login", { timeout: 8000 });

    // Intenta registrarlo de nuevo con el mismo correo
    await page.goto(URL);
    await page.locator("#name").fill("OtroNombre");
    await page.locator("#surname").fill("OtroApellido");
    await page.locator("#email").fill(correoDuplicado);
    await page.locator("#password").fill("contrasenavalida123");
    await page.locator("#repeat").fill("contrasenavalida123");
    await page.getByRole("button", { name: "Enviar" }).click();

    await expect(page.locator(elementoToast).first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator(elementoToast).first()).toContainText(/usuario/i);
    await expect(page).toHaveURL(URL);
  });
});
