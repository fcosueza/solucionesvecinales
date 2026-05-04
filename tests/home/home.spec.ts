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
    await expect(enlaceCaracteristicas).toHaveAttribute("href", "#gallery");
    await expect(enlaceContacto).toHaveAttribute("href", "#contact");
  });
});

test.describe("Contenido de las secciones", () => {
  test("La sección hero contiene sus elementos correctos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page.getByRole("heading", { level: 1, name: "¡Tu comunidad, más conectada" })).toBeVisible();
    await expect(page.getByText("Con nuestra app, gestiona incidencias")).toBeVisible();
    await expect(page.getByRole("button", { name: "Regístrate ahora" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Imagen de la pantalla de un monitor" }).first()).toBeVisible();
  });

  test("La sección de motivación contiene su mensaje principal", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const seccionMotivacion = page.locator("section#gallery");

    await expect(seccionMotivacion).toBeVisible();
    await expect(seccionMotivacion.getByRole("heading", { level: 2 })).toContainText("tu comunidad");
    await expect(seccionMotivacion.getByRole("heading", { level: 2 })).toContainText("necesita en un solo lugar");
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

test.describe("contenido del footer", () => {
  test("El footer contiene los enlaces de navegación correctos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const footer = page.getByRole("contentinfo");

    await expect(footer).toBeVisible();
    await expect(footer.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "#");
    await expect(footer.getByRole("link", { name: "Política de Cookies" })).toHaveAttribute(
      "href",
      "/politica-cookies"
    );
    await expect(footer.getByRole("link", { name: "Política de Privacidad" })).toHaveAttribute(
      "href",
      "/politica-privacidad"
    );
  });

  test("El footer muestra los iconos sociales esperados con enlaces externos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const footer = page.getByRole("contentinfo");
    const social = footer.getByLabel("social");
    const socialLinks = social.locator("a");

    await expect(social).toBeVisible();
    await expect(socialLinks).toHaveCount(5);
    await expect(socialLinks.nth(0)).toHaveAttribute("href", "https://www.facebook.com/");
    await expect(socialLinks.nth(1)).toHaveAttribute("href", "https://www.github.com/");
    await expect(socialLinks.nth(2)).toHaveAttribute("href", "https://www.instagram.com/");
    await expect(socialLinks.nth(3)).toHaveAttribute("href", "https://www.linkedin.com/");
    await expect(socialLinks.nth(4)).toHaveAttribute("href", "https://www.x.com/");
    await expect(socialLinks.first()).toHaveAttribute("target", "_blank");
    await expect(footer.getByRole("img", { name: "Icono de Facebook" })).toBeVisible();
    await expect(footer.getByRole("img", { name: "Icono de GitHub" })).toBeVisible();
    await expect(footer.getByRole("img", { name: "Icono de Instagram" })).toBeVisible();
    await expect(footer.getByRole("img", { name: "Icono de LinkedIn" })).toBeVisible();
    await expect(footer.getByRole("img", { name: "Icono de X" })).toBeVisible();
  });

  test("El footer muestra el logo", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const footer = page.getByRole("contentinfo");

    await expect(footer.getByRole("img", { name: /Logo/i })).toBeVisible();
  });
});
