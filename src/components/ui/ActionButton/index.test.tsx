import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActionButton from ".";

jest.mock("@/components/layouts/Forms/FinanceAddForm", () => ({
  __esModule: true,
  default: ({ communityID, onClose }: { communityID: number; onClose: () => void }) => (
    <div>
      FinanceAddForm {communityID}
      <button onClick={onClose}>Cerrar Finance</button>
    </div>
  )
}));

jest.mock("@/components/layouts/Forms/IncidentAddForm", () => ({
  __esModule: true,
  default: ({ communityID, onClose }: { communityID: number; onClose: () => void }) => (
    <div>
      IncidentAddForm {communityID}
      <button onClick={onClose}>Cerrar Incident</button>
    </div>
  )
}));

describe("Suite de pruebas del componente ActionButton", () => {
  it("Debe renderizar el texto por defecto cuando no se pasa buttonText", () => {
    render(<ActionButton modalType="finance" communityID={7} />);

    expect(screen.getByRole("button", { name: "+ añadir" })).toBeInTheDocument();
  });

  it("No debe renderizar el boton cuando canOpen es false", () => {
    render(<ActionButton buttonText="+ añadir registro" canOpen={false} modalType="finance" communityID={7} />);

    expect(screen.queryByRole("button", { name: "+ añadir registro" })).not.toBeInTheDocument();
    expect(screen.queryByText("FinanceAddForm 7")).not.toBeInTheDocument();
    expect(screen.queryByText("IncidentAddForm 7")).not.toBeInTheDocument();
  });

  it("Debe abrir FinanceAddForm al hacer click cuando modalType es finance", async () => {
    render(<ActionButton buttonText="+ añadir registro" modalType="finance" communityID={7} />);

    await userEvent.click(screen.getByRole("button", { name: "+ añadir registro" }));

    expect(screen.getByText("FinanceAddForm 7")).toBeInTheDocument();
    expect(screen.queryByText("IncidentAddForm 7")).not.toBeInTheDocument();
  });

  it("Debe abrir IncidentAddForm al hacer click cuando modalType es incident", async () => {
    render(<ActionButton buttonText="+ añadir incidencias" modalType="incident" communityID={12} />);

    await userEvent.click(screen.getByRole("button", { name: "+ añadir incidencias" }));

    expect(screen.getByText("IncidentAddForm 12")).toBeInTheDocument();
    expect(screen.queryByText("FinanceAddForm 12")).not.toBeInTheDocument();
  });

  it("Debe cerrar FinanceAddForm al llamar onClose", async () => {
    render(<ActionButton buttonText="+ añadir registro" modalType="finance" communityID={7} />);

    await userEvent.click(screen.getByRole("button", { name: "+ añadir registro" }));
    expect(screen.getByText("FinanceAddForm 7")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Cerrar Finance" }));
    expect(screen.queryByText("FinanceAddForm 7")).not.toBeInTheDocument();
  });

  it("Debe cerrar IncidentAddForm al llamar onClose", async () => {
    render(<ActionButton buttonText="+ añadir incidencias" modalType="incident" communityID={12} />);

    await userEvent.click(screen.getByRole("button", { name: "+ añadir incidencias" }));
    expect(screen.getByText("IncidentAddForm 12")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Cerrar Incident" }));
    expect(screen.queryByText("IncidentAddForm 12")).not.toBeInTheDocument();
  });
});
