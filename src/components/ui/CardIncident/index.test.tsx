import { render, screen } from "@testing-library/react";

jest.mock("@/actions/community/communityIncident", () => jest.fn());

import CardIncident from ".";

describe("Suite de pruebas del componente CardIncident", () => {
  const fecha = new Date("2026-05-02T09:30:00.000Z");
  const actualizadaEn = new Date("2026-05-02T10:30:00.000Z");

  it("Debe renderizar nombre, email y fecha", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={fecha}
        title="Bombilla fundida"
        updatedAt={actualizadaEn}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
      />
    );

    expect(screen.getByText("Maria Perez")).toBeInTheDocument();
    expect(screen.getByText("maria@test.com")).toBeInTheDocument();
    expect(screen.getByText("Bombilla fundida")).toBeInTheDocument();
    expect(screen.getByText("Actualizada")).toBeInTheDocument();
    expect(screen.getByText("La puerta principal no cierra correctamente")).toBeInTheDocument();
  });

  it("Debe mostrar estado REPORTADA con color azul", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={fecha}
        title="Bombilla fundida"
        updatedAt={actualizadaEn}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("reportada")).toHaveClass("stateReported");
    expect(screen.getByRole("button")).toHaveTextContent("Procesar");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("Debe mostrar estado PROCESANDOSE con color naranja", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={fecha}
        title="Bombilla fundida"
        updatedAt={actualizadaEn}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="procesandose"
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("procesandose")).toHaveClass("stateProcessing");
    expect(screen.getByRole("button")).toHaveTextContent("Resolver");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("Debe mostrar estado RESUELTA con color verde y boton deshabilitado", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={fecha}
        title="Bombilla fundida"
        updatedAt={actualizadaEn}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="resuelto"
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("resuelta")).toHaveClass("stateResolved");
    expect(screen.getByRole("button")).toHaveTextContent("Resuelta");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("Debe incluir los campos ocultos para ejecutar la server action", () => {
    const { container } = render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={fecha}
        title="Bombilla fundida"
        updatedAt={actualizadaEn}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
      />
    );

    expect(container.querySelector('input[name="communityID"]')).toHaveAttribute("value", "5");
    expect(container.querySelector('input[name="userID"]')).toHaveAttribute("value", "user-1");
    expect(container.querySelector('input[name="incidentDate"]')).toHaveAttribute("value", fecha.toISOString());
  });
});
