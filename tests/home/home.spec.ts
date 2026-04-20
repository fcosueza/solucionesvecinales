import { test, expect } from "@playwright/test";

test.describe("navegación pagina de inicio", () => {
  test("Cualquier usuario puede navegar a la página de inicio", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("La página de inicio tiene el título correcto", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle(/Soluciones Vecinales/i);
  });
});

test.describe("contenido de la cabecera", () => {
  test("La página de inicio tiene dos logotipos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const images = await page.getByRole("img", { name: /Logo/i }).all();

    expect(images).toHaveLength(2);
  });

  test("El menú principal contiene los enlaces correctos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const enlaceInicio = page.getByRole("link", { name: "Inicio" }).first();
    const enlaceCaracteristicas = page.getByRole("link", { name: "Características" });
    const enlaceContacto = page.getByRole("link", { name: "Contacto" }).first();

    await expect(enlaceInicio).toBeVisible();
    await expect(enlaceCaracteristicas).toBeVisible();
    await expect(enlaceContacto).toBeVisible();

    await expect(enlaceInicio).toHaveAttribute("href", "#");
    await expect(enlaceCaracteristicas).toHaveAttribute("href", "#about");
    await expect(enlaceContacto).toHaveAttribute("href", "#contact");
  });
});

test.describe("Contenido de las secciones", () => {
  test("La sección hero contiene sus elementos correctos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(
      page.getByRole("heading", { level: 1, name: "¡Tu comunidad, más conectada y organizada que nunca!" })
    ).toBeVisible();
    await expect(
      page.getByText("Gestiona incidencias, recibe avisos importantes, reserva espacios comunes y")
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Regístrate ahora" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Imagen de la pantalla de un monitor" }).first()).toBeVisible();
  });

  test("La sección de motivación contiene su mensaje principal", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const seccionMotivacion = page.locator("section#motivation");

    await expect(seccionMotivacion).toBeVisible();
    await expect(seccionMotivacion.getByRole("heading", { level: 2 })).toContainText("nuestra app");
    await expect(seccionMotivacion.getByRole("heading", { level: 2 })).toContainText("cada vecino cuenta");
  });

  test("La sección about contiene la información correcta", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const seccionAbout = page.locator("section#about");

    await expect(seccionAbout).toBeVisible();
    await expect(
      seccionAbout.getByRole("heading", { level: 3, name: "Adaptada a cualquier dispositivo" })
    ).toBeVisible();
    await expect(seccionAbout.getByRole("heading", { level: 3, name: "Centrada en la accesibilidad" })).toBeVisible();
    await expect(seccionAbout.getByRole("img", { name: "Imagen de la pantalla de un monitor" })).toHaveCount(2);
    await expect(seccionAbout.getByText("Pensada para usarse desde cualquier dispositivo")).toBeVisible();
    await expect(seccionAbout.getByText("nuestra aplicación pone especial énfasis en la accesibilidad")).toBeVisible();
  });

  test("La sección gallery contiene las tarjetas correctas", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const seccionGallery = page.locator("section#gallery");

    await expect(seccionGallery).toBeVisible();
    await expect(seccionGallery.locator('[role="gallery"]')).toBeVisible();
    await expect(seccionGallery.locator('[role="card"]')).toHaveCount(4);
    await expect(seccionGallery.getByRole("heading", { level: 3, name: "Tablón de Anuncios" })).toBeVisible();
    await expect(seccionGallery.getByRole("heading", { level: 3, name: "Gestión de Incidencias" })).toBeVisible();
    await expect(seccionGallery.getByRole("heading", { level: 3, name: "Espacios Comunes" })).toBeVisible();
    await expect(seccionGallery.getByRole("heading", { level: 3, name: "Consulta las finanzas" })).toBeVisible();
  });

  test("La sección de contacto contiene el contenido y formulario correctos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const seccionContacto = page.locator("section#contact");

    await expect(seccionContacto).toBeVisible();
    await expect(seccionContacto.getByRole("heading", { level: 3, name: "Contacta con nosotros" })).toBeVisible();
    await expect(seccionContacto.getByText("Si tienes alguna duda")).toBeVisible();
    await expect(seccionContacto.getByRole("img", { name: "Hombre mandando un correo" })).toBeVisible();
    await expect(seccionContacto.getByRole("form")).toBeVisible();
    await expect(seccionContacto.getByRole("textbox", { name: "name-input" })).toBeVisible();
    await expect(seccionContacto.getByRole("textbox", { name: "email-input" })).toBeVisible();
    await expect(seccionContacto.getByRole("textbox", { name: "msg-input" })).toBeVisible();
    await expect(seccionContacto.getByRole("button", { name: "Enviar" })).toBeVisible();
  });
});
