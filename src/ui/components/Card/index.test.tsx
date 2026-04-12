import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Suite de pruebas del componente Card", () => {
  const urlImagen = "/assets/image/doc.svg";
  const textoAlternativo = "Imagen de unos documentos";
  const titulo = "Lorem Ipsum Dolor";
  const parrafo = "Lorem Ipsum Dolor sit atmet consecterum";

  it("Debe renderizar una tarjeta correctamente", () => {
    render(<Card imageURL={urlImagen} imageAltText={textoAlternativo} cardTitle={titulo} cardPara={parrafo} />);

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("Debe renderizar una tarjeta con la imagen y dimensiones indicadas", () => {
    const anchoImagen = 120;
    const altoImagen = 200;

    render(
      <Card
        imageURL={urlImagen}
        imageAltText={textoAlternativo}
        imageWidth={anchoImagen}
        imageHeight={altoImagen}
        cardTitle={titulo}
        cardPara={parrafo}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("width", anchoImagen);
    expect(screen.getByRole("img")).toHaveProperty("height", altoImagen);
  });

  it("Debe renderizar una tarjeta con el título indicado", () => {
    render(<Card imageURL={urlImagen} imageAltText={textoAlternativo} cardTitle={titulo} cardPara={parrafo} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(titulo)).toBeInTheDocument();
  });

  it("Debe renderizar una tarjeta con el párrafo indicado", () => {
    render(<Card imageURL={urlImagen} imageAltText={textoAlternativo} cardTitle={titulo} cardPara={parrafo} />);

    expect(screen.getByText(parrafo)).toBeInTheDocument();
    expect(screen.getByText(parrafo)).toBeInTheDocument();
  });
});
