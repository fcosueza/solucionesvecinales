import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("Tests del componente Logo...", () => {
  const url = "assets/images/logo.svg";

  it("Debe renderizar un logo de forma adecuada", () => {
    render(<Logo url={url} altText="Logotipo" />);
    expect(screen.getByRole("logo")).toBeInTheDocument();
  });

  it("Debe renderizar un logo con el texto alternativo indicado", () => {
    const altText = "Logo de la Empresa";

    render(<Logo url={url} altText={altText} />);
    expect(screen.getByRole("logo")).toHaveAttribute("alt", altText);
  });

  it("Debe renderizar el logo con el tamaño predeterminado si no especifica uno", () => {
    const defaultWidth = 150;
    const defaultHeight = 120;

    render(<Logo url={url} altText="Logotipo" />);
    expect(screen.getByRole("logo")).toHaveProperty("width", defaultWidth);
    expect(screen.getByRole("logo")).toHaveProperty("height", defaultHeight);
  });

  it("Debe renderizar un logo con el tamaño indicado", () => {
    const width = 150;
    const height = 120;

    render(<Logo url={url} altText="Logotipo" width={width} height={height} />);
    expect(screen.getByRole("logo")).toHaveProperty("width", width);
    expect(screen.getByRole("logo")).toHaveProperty("height", height);
  });

  it("Debe renderizar un logo de forma adecuada", () => {
    render(<Logo url={url} altText="Logotipo" />);
    expect(screen.getByRole("logo")).toBeInTheDocument();
  });
});
