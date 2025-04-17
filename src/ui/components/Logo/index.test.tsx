import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("Tests del componente Logo...", () => {
  it("Debe renderizar un logo de forma adecuada", () => {
    const url = "assets/images/logo.svg";

    render(<Logo url={url} altText="Logotipo" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Debe renderizar un logo con el texto alternativo indicado", () => {
    const url = "assets/images/logo.svg";
    const altText = "Logo de la Empresa";

    render(<Logo url={url} altText={altText} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", altText);
  });

  it("Debe renderizar el logo con el tamaño predeterminado si no especifica uno", () => {
    const url = "assets/images/logo.svg";
    const defaultWidth = 150;
    const defaultHeight = 120;

    render(<Logo url={url} altText="Logotipo" />);
    expect(screen.getByRole("img")).toHaveProperty("width", defaultWidth);
    expect(screen.getByRole("img")).toHaveProperty("height", defaultHeight);
  });

  it("Debe renderizar un logo con el tamaño indicado", () => {
    const url = "assets/images/logo.svg";
    const width = 150;
    const height = 120;

    render(<Logo url={url} altText="Logotipo" width={width} height={height} />);
    expect(screen.getByRole("img")).toHaveProperty("width", width);
    expect(screen.getByRole("img")).toHaveProperty("height", height);
  });

  it("Debe renderizar un logo de forma adecuada", () => {
    const url = "assets/images/logo.svg";

    render(<Logo url={url} altText="Logotipo" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
