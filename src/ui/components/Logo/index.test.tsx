import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("Pruebas del componente Logo", () => {
  const rutaLogo = "assets/images/logo.svg";

  it("Debe renderizar el logo", () => {
    render(<Logo url={rutaLogo} altText="Logotipo" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Debe renderizar el logo con el texto alternativo indicado", () => {
    const textoAlternativo = "Logo de la Empresa";

    render(<Logo url={rutaLogo} altText={textoAlternativo} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", textoAlternativo);
  });

  it("Debe renderizar el logo con el tamano predeterminado si no se indica uno", () => {
    const anchoPredeterminado = 150;
    const altoPredeterminado = 120;

    render(<Logo url={rutaLogo} altText="Logotipo" />);
    expect(screen.getByRole("img")).toHaveProperty("height", altoPredeterminado);
    expect(screen.getByRole("img")).toHaveProperty("width", anchoPredeterminado);
  });

  it("Debe renderizar un logo con el tamano indicado", () => {
    const ancho = 150;
    const alto = 120;

    render(<Logo url={rutaLogo} altText="Logotipo" width={ancho} height={alto} />);
    expect(screen.getByRole("img")).toHaveProperty("width", ancho);
    expect(screen.getByRole("img")).toHaveProperty("height", alto);
  });

  it("Debe renderizar un logo de forma adecuada", () => {
    render(<Logo url={rutaLogo} altText="Logotipo" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
