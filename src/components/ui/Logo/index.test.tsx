import { render, screen } from "@testing-library/react";
import Logo from ".";

describe("Logo component test suite", () => {
  const logoPath = "assets/images/logo.svg";

  it("should render the logo", () => {
    render(<Logo url={logoPath} altText="Logotipo" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render the logo with the specified alt text", () => {
    const altText = "Logo de la Empresa";

    render(<Logo url={logoPath} altText={altText} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", altText);
  });

  it("should render the logo with the default size if none is specified", () => {
    const defaultWidth = 150;
    const defaultHeight = 120;

    render(<Logo url={logoPath} altText="Logotipo" />);
    expect(screen.getByRole("img")).toHaveProperty("height", defaultHeight);
    expect(screen.getByRole("img")).toHaveProperty("width", defaultWidth);
  });

  it("should render a logo with the specified size", () => {
    const width = 150;
    const height = 120;

    render(<Logo url={logoPath} altText="Logotipo" width={width} height={height} />);
    expect(screen.getByRole("img")).toHaveProperty("width", width);
    expect(screen.getByRole("img")).toHaveProperty("height", height);
  });
});
