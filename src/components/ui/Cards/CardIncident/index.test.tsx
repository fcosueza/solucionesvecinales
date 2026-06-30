import { render, screen } from "@testing-library/react";

jest.mock("@/actions/community/communityIncident", () => ({
  __esModule: true,
  default: jest.fn(),
  deleteIncident: jest.fn()
}));

import CardIncident from ".";

describe("CardIncident component test suite", () => {
  const date = new Date("2026-05-02T09:30:00.000Z");
  const updatedAt = new Date("2026-05-02T10:30:00.000Z");
  const formatDateLabel = (date: Date): string =>
    new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);

  it("should render name, email, and date", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
      />
    );

    expect(screen.getByText("Maria Perez")).toBeInTheDocument();
    expect(screen.getByText("maria@test.com")).toBeInTheDocument();
    expect(screen.getByText(formatDateLabel(date))).toBeInTheDocument();
    expect(screen.getByText("Bombilla fundida")).toBeInTheDocument();
    expect(screen.getByText("Actualizada")).toBeInTheDocument();
    expect(screen.getByText("La puerta principal no cierra correctamente")).toBeInTheDocument();
  });

  it("should show REPORTADA status with blue color", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
        isAdmin
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("reportada")).toHaveClass("stateReported");
    expect(screen.getByRole("button")).toHaveTextContent("Procesar");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should show PROCESANDOSE status with orange color", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="procesandose"
        isAdmin
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("procesandose")).toHaveClass("stateProcessing");
    expect(screen.getByRole("button")).toHaveTextContent("Resolver");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("should show RESUELTA status with green color and disabled button", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="resuelto"
        isAdmin
      />
    );

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByText("resuelta")).toHaveClass("stateResolved");
    expect(screen.getByRole("button", { name: "Resuelta" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Eliminar incidencia" })).toBeInTheDocument();
  });

  it("should not show status-change button when user is not admin", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
      />
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should not show delete button if incident is not resolved", () => {
    render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="procesandose"
        isAdmin
      />
    );

    expect(screen.queryByRole("button", { name: "Eliminar incidencia" })).not.toBeInTheDocument();
  });

  it("should include hidden fields to execute the server action", () => {
    const { container } = render(
      <CardIncident
        communityID={5}
        userID="user-1"
        incidentDate={date}
        title="Bombilla fundida"
        updatedAt={updatedAt}
        userName="Maria Perez"
        userEmail="maria@test.com"
        description="La puerta principal no cierra correctamente"
        state="reportado"
      />
    );

    expect(container.querySelector('input[name="communityID"]')).toHaveAttribute("value", "5");
    expect(container.querySelector('input[name="userID"]')).toHaveAttribute("value", "user-1");
    expect(container.querySelector('input[name="incidentDate"]')).toHaveAttribute("value", date.toISOString());
  });
});
