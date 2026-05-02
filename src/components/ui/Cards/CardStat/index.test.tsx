import { render, screen } from "@testing-library/react";
import CardStat from ".";

describe("Suite de pruebas del componente CardStat", () => {
  const titulo = "Incidentes Reportados";
  const valor = "15";
  const descripcion = "Número de incidentes reportados en el último mes";

  it("Debe renderizar el componente correctamente", () => {
    render(<CardStat title={titulo} value={valor} description={descripcion} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("Debe renderizar el título indicado", () => {
    render(<CardStat title={titulo} value={valor} description={descripcion} />);

    expect(screen.getByText(titulo)).toBeInTheDocument();
  });

  it("Debe renderizar el valor indicado", () => {
    render(<CardStat title={titulo} value={valor} description={descripcion} />);

    expect(screen.getByText(valor)).toBeInTheDocument();
  });

  it("Debe renderizar la descripción indicada", () => {
    render(<CardStat title={titulo} value={valor} description={descripcion} />);

    expect(screen.getByText(descripcion)).toBeInTheDocument();
  });

  it("Debe renderizar los tres elementos de texto en el orden correcto", () => {
    render(<CardStat title={titulo} value={valor} description={descripcion} />);

    const parrafos = screen.getAllByRole("article")[0].querySelectorAll("p");

    expect(parrafos).toHaveLength(3);
    expect(parrafos[0]).toHaveTextContent(titulo);
    expect(parrafos[1]).toHaveTextContent(valor);
    expect(parrafos[2]).toHaveTextContent(descripcion);
  });
});
