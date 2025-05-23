import { render, screen } from "@testing-library/react";
import Gallery from ".";

describe("Tests del componente Gallery...", () => {
  it("Debe renderizar el componente gallery correctamente", () => {
    render(
      <Gallery>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getByRole("gallery")).toBeInTheDocument();
  });

  it("Debe renderizar los elementos que se le pasan como hijos", () => {
    render(
      <Gallery>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("Debe renderizar todos los elementos que se le pasan como hijos", () => {
    render(
      <Gallery>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getAllByRole("heading")).toHaveLength(4);
  });

  it("Debe renderizar la galería con la clase CSS gallery cargada", () => {
    render(
      <Gallery>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getByRole("gallery")).toHaveClass("gallery");
  });

  it("Debe renderizar el titulo que se le ha pasado", () => {
    const title = "Lorem Ipsum Title";

    render(
      <Gallery title={title}>
        <div>Test</div>
      </Gallery>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("No debe renderizar el titulo si no se pasa ninguno", () => {
    render(
      <Gallery>
        <div>Test</div>
      </Gallery>
    );

    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
