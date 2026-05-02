import { render, screen } from "@testing-library/react";
import CardFeatures from ".";

describe("Suite de pruebas del componente CardFeatures", () => {
  const urlImagen = "/assets/image/doc.svg";
  const textoAlternativo = "Imagen de unos documentos";
  const titulo = "Lorem Ipsum Dolor";
  const parrafo = "Lorem Ipsum Dolor sit atmet consecterum";

  it("Debe renderizar una tarjeta correctamente", () => {
    render(<CardFeatures iconURL={urlImagen} iconAltText={textoAlternativo} cardTitle={titulo} cardPara={parrafo} />);

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("Debe renderizar una tarjeta con el icono y dimensiones indicadas", () => {
    const anchoImagen = 120;
    const altoImagen = 200;

    render(
      <CardFeatures
        iconURL={urlImagen}
        iconAltText={textoAlternativo}
        iconWidth={anchoImagen}
        iconHeight={altoImagen}
        cardTitle={titulo}
        cardPara={parrafo}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("width", anchoImagen);
    expect(screen.getByRole("img")).toHaveProperty("height", altoImagen);
  });

  it("Debe renderizar una tarjeta con el título indicado", () => {
    render(<CardFeatures iconURL={urlImagen} iconAltText={textoAlternativo} cardTitle={titulo} cardPara={parrafo} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(titulo)).toBeInTheDocument();
  });

  it("Debe renderizar una tarjeta con el párrafo indicado", () => {
    render(<CardFeatures iconURL={urlImagen} iconAltText={textoAlternativo} cardTitle={titulo} cardPara={parrafo} />);

    expect(screen.getByText(parrafo)).toBeInTheDocument();
    expect(screen.getByText(parrafo)).toBeInTheDocument();
  });
});
