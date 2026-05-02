import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { deleteMessage } from "@/actions/community/communityMessage";
import MessageBoard from ".";

jest.mock("@/actions/community/communityMessage", () => ({
  deleteMessage: jest.fn()
}));

jest.mock("@/components/layouts/Forms/MessageAddForm", () => ({
  __esModule: true,
  default: ({ comunidadId, onClose }: { comunidadId: number; onClose: () => void }) => (
    <div data-testid="message-add-form">
      <p>Formulario para comunidad {comunidadId}</p>
      <button type="button" onClick={onClose}>
        Cerrar formulario
      </button>
    </div>
  )
}));

const deleteMessageMock = deleteMessage as jest.Mock;

const mensajesEjemplo = [
  { texto: "Aviso de reunión vecinal", creadoEn: new Date("2024-03-01T10:00:00") },
  { texto: "Corte de agua el martes", creadoEn: new Date("2024-03-02T15:30:00") }
];

describe("Suite de pruebas del componente MessageBoard", () => {
  beforeEach(() => {
    deleteMessageMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Debe mostrar el estado vacío cuando no hay mensajes", () => {
    render(<MessageBoard mensajes={[]} comunidadId={1} />);

    expect(screen.getByText("No hay mensajes publicados.")).toBeInTheDocument();
    expect(screen.getByText("Cuando se creen avisos para esta comunidad, apareceran aqui.")).toBeInTheDocument();
  });

  it("Debe mostrar los mensajes y sus fechas formateadas", () => {
    render(<MessageBoard mensajes={mensajesEjemplo} comunidadId={1} />);

    expect(screen.getByText("Aviso de reunión vecinal")).toBeInTheDocument();
    expect(screen.getByText("Corte de agua el martes")).toBeInTheDocument();
    expect(screen.getByText(/01\/03\/2024/)).toBeInTheDocument();
    expect(screen.getByText(/02\/03\/2024/)).toBeInTheDocument();
  });

  it("Debe mostrar el botón de añadir para administradores", () => {
    render(<MessageBoard mensajes={[]} comunidadId={1} isAdmin />);

    expect(screen.getByRole("button", { name: "+ Añadir mensaje" })).toBeInTheDocument();
  });

  it("No debe mostrar controles de administrador para usuarios no admin", () => {
    render(<MessageBoard mensajes={mensajesEjemplo} comunidadId={1} />);

    expect(screen.queryByRole("button", { name: "+ Añadir mensaje" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Eliminar mensaje" })).not.toBeInTheDocument();
  });

  it("Debe mostrar botones de eliminar para admin y llamar a deleteMessage", async () => {
    render(<MessageBoard mensajes={mensajesEjemplo} comunidadId={7} isAdmin />);

    const botonesEliminar = screen.getAllByRole("button", { name: "Eliminar mensaje" });
    expect(botonesEliminar).toHaveLength(2);

    await userEvent.click(botonesEliminar[0]);

    expect(deleteMessageMock).toHaveBeenCalledTimes(1);
    expect(deleteMessageMock).toHaveBeenCalledWith(7, mensajesEjemplo[0].creadoEn);
  });

  it("Debe abrir el MessageAddForm al pulsar '+ Añadir mensaje' en estado vacío", async () => {
    render(<MessageBoard mensajes={[]} comunidadId={9} isAdmin />);

    expect(screen.queryByTestId("message-add-form")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "+ Añadir mensaje" }));

    expect(screen.getByTestId("message-add-form")).toBeInTheDocument();
    expect(screen.getByText("Formulario para comunidad 9")).toBeInTheDocument();
  });

  it("Debe abrir el MessageAddForm al pulsar '+ Añadir mensaje' con mensajes", async () => {
    render(<MessageBoard mensajes={mensajesEjemplo} comunidadId={11} isAdmin />);

    await userEvent.click(screen.getByRole("button", { name: "+ Añadir mensaje" }));

    expect(screen.getByTestId("message-add-form")).toBeInTheDocument();
    expect(screen.getByText("Formulario para comunidad 11")).toBeInTheDocument();
  });

  it("Debe cerrar el MessageAddForm cuando el hijo ejecuta onClose", async () => {
    render(<MessageBoard mensajes={[]} comunidadId={9} isAdmin />);

    await userEvent.click(screen.getByRole("button", { name: "+ Añadir mensaje" }));
    await userEvent.click(screen.getByRole("button", { name: "Cerrar formulario" }));

    expect(screen.queryByTestId("message-add-form")).not.toBeInTheDocument();
  });
});
