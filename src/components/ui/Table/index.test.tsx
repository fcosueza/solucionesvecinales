import { render, screen } from "@testing-library/react";
import Table from ".";

describe("Suite de pruebas del componente Table", () => {
  const headers = ["Nombre", "Ciudad"];

  it("Debe renderizar los encabezados indicados", () => {
    render(<Table headers={headers} rows={[]} />);

    expect(screen.getByRole("columnheader", { name: "Nombre" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Ciudad" })).toBeInTheDocument();
  });

  it("Debe renderizar las filas con los datos indicados", () => {
    render(
      <Table
        headers={headers}
        rows={[
          { key: 1, cells: ["Comunidad Centro", "Madrid"] },
          { key: 2, cells: ["Comunidad Norte", "Bilbao"] }
        ]}
      />
    );

    expect(screen.getByText("Comunidad Centro")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
    expect(screen.getByText("Comunidad Norte")).toBeInTheDocument();
    expect(screen.getByText("Bilbao")).toBeInTheDocument();
  });

  it("Debe renderizar filas aunque no se indique una key explicita", () => {
    render(
      <Table
        headers={headers}
        rows={[
          { cells: ["Comunidad Sur", "Sevilla"] },
          { cells: ["Comunidad Este", "Valencia"] }
        ]}
      />
    );

    expect(screen.getByText("Comunidad Sur")).toBeInTheDocument();
    expect(screen.getByText("Sevilla")).toBeInTheDocument();
    expect(screen.getByText("Comunidad Este")).toBeInTheDocument();
    expect(screen.getByText("Valencia")).toBeInTheDocument();
  });

  it("Debe renderizar el mensaje vacío personalizado cuando no hay datos", () => {
    render(
      <Table
        headers={headers}
        rows={[]}
        emptyMessage="No se encontraron resultados"
      />
    );

    expect(screen.getByText("No se encontraron resultados")).toBeInTheDocument();
  });
});