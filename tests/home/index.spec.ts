import { test, expect } from "@playwright/test";

test.describe("home page navigation", () => {
  test("Any user can navigate to the home page", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("The home page has the correct title", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle(/Soluciones Vecinales/i);
  });
});

test.describe("header content", () => {
  test("The home page shows two logos", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const images = await page.getByRole("img", { name: /Logo/i }).all();

    expect(images).toHaveLength(2);
  });

  test("The main menu contains the correct links", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const homePageLink = page.getByRole("link", { name: "Inicio" }).first();
    const featuresLink = page.getByRole("link", { name: "Características" });
    const contactLink = page.getByRole("link", { name: "Contacto" }).first();

    await expect(homePageLink).toBeVisible();
    await expect(featuresLink).toBeVisible();
    await expect(contactLink).toBeVisible();

    await expect(homePageLink).toHaveAttribute("href", "#");
    await expect(featuresLink).toHaveAttribute("href", "#gallery");
    await expect(contactLink).toHaveAttribute("href", "#contact");
  });
});

test.describe("section content", () => {
  test("The hero section contains the expected elements", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page.getByRole("heading", { level: 1, name: "¡Tu comunidad, más conectada" })).toBeVisible();
    await expect(page.getByText("Con nuestra app, gestiona incidencias")).toBeVisible();
    await expect(page.getByRole("button", { name: "Regístrate ahora" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Imagen de la pantalla de un monitor" }).first()).toBeVisible();
  });

  test("The motivation section contains its main message", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const seccionMotivacion = page.locator("section#gallery");

    await expect(seccionMotivacion).toBeVisible();
    await expect(seccionMotivacion.getByRole("heading", { level: 2 })).toContainText("tu comunidad");
    await expect(seccionMotivacion.getByRole("heading", { level: 2 })).toContainText("necesita en un solo lugar");
  });

  test("The gallery section contains the correct cards", async ({ page }) => {
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

  test("The contact section contains the correct content and form", async ({ page }) => {
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

test.describe("footer content", () => {
  test("The footer contains the correct navigation links", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const footer = page.getByRole("contentinfo");

    await expect(footer).toBeVisible();
    await expect(footer.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "#");
    await expect(footer.getByRole("link", { name: "Política de Cookies" })).toHaveAttribute("href", "/cookie-policy");
    await expect(footer.getByRole("link", { name: "Política de Privacidad" })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
  });

  test("The footer shows the expected social icons with external links", async ({ page }) => {
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

  test("The footer shows the logo", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const footer = page.getByRole("contentinfo");

    await expect(footer.getByRole("img", { name: /Logo/i })).toBeVisible();
  });
});
