import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { deleteMessage } from "@/actions/community/communityMessage";
import MessageBoard from ".";

jest.mock("@/actions/community/communityMessage", () => ({
  deleteMessage: jest.fn()
}));

jest.mock("@/components/layouts/Forms/MessageAddForm", () => ({
  __esModule: true,
  default: ({ communityID, onClose }: { communityID: number; onClose: () => void }) => (
    <div data-testid="message-add-form">
      <p>Form for community {communityID}</p>
      <button type="button" onClick={onClose}>
        Close form
      </button>
    </div>
  )
}));

const deleteMessageMock = deleteMessage as jest.Mock;

const mensajesEjemplo = [
  { text: "Aviso de reunión vecinal", createdAt: new Date("2024-03-01T10:00:00") },
  { text: "Corte de agua el martes", createdAt: new Date("2024-03-02T15:30:00") }
];

describe("MessageBoard component test suite", () => {
  beforeEach(() => {
    deleteMessageMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should show the empty state when there are no messages", () => {
    render(<MessageBoard messages={[]} communityID={1} />);

    expect(screen.getByText("No hay mensajes publicados.")).toBeInTheDocument();
    expect(screen.getByText("Cuando se creen avisos para esta comunidad, apareceran aqui.")).toBeInTheDocument();
  });

  it("Should show messages and their formatted dates", () => {
    render(<MessageBoard messages={mensajesEjemplo} communityID={1} />);

    expect(screen.getByText("Aviso de reunión vecinal")).toBeInTheDocument();
    expect(screen.getByText("Corte de agua el martes")).toBeInTheDocument();
    expect(screen.getByText(/01\/03\/2024/)).toBeInTheDocument();
    expect(screen.getByText(/02\/03\/2024/)).toBeInTheDocument();
  });

  it("Should show the add button for admins", () => {
    render(<MessageBoard messages={[]} communityID={1} isAdmin />);

    expect(screen.getByRole("button", { name: "+ Añadir mensaje" })).toBeInTheDocument();
  });

  it("Should not show admin controls for non-admin users", () => {
    render(<MessageBoard messages={mensajesEjemplo} communityID={1} />);

    expect(screen.queryByRole("button", { name: "+ Añadir mensaje" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Eliminar mensaje" })).not.toBeInTheDocument();
  });

  it("Should show delete buttons for admins and call deleteMessage", async () => {
    render(<MessageBoard messages={mensajesEjemplo} communityID={7} isAdmin />);

    const botonesEliminar = screen.getAllByRole("button", { name: "Eliminar mensaje" });
    expect(botonesEliminar).toHaveLength(2);

    await userEvent.click(botonesEliminar[0]);

    expect(deleteMessageMock).toHaveBeenCalledTimes(1);
    expect(deleteMessageMock).toHaveBeenCalledWith(7, mensajesEjemplo[0].createdAt);
  });

  it("Should open MessageAddForm when '+ Añadir mensaje' is clicked in empty state", async () => {
    render(<MessageBoard messages={[]} communityID={9} isAdmin />);

    expect(screen.queryByTestId("message-add-form")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "+ Añadir mensaje" }));

    const addForm = screen.getByTestId("message-add-form");
    expect(addForm).toBeInTheDocument();
    expect(addForm).toHaveTextContent(/Form for community\s*9/);
  });

  it("Should open MessageAddForm when '+ Añadir mensaje' is clicked with messages", async () => {
    render(<MessageBoard messages={mensajesEjemplo} communityID={11} isAdmin />);

    await userEvent.click(screen.getByRole("button", { name: "+ Añadir mensaje" }));

    const addForm = screen.getByTestId("message-add-form");
    expect(addForm).toBeInTheDocument();
    expect(addForm).toHaveTextContent(/Form for community\s*11/);
  });

  it("Should close MessageAddForm when the child calls onClose", async () => {
    render(<MessageBoard messages={[]} communityID={9} isAdmin />);

    await userEvent.click(screen.getByRole("button", { name: "+ Añadir mensaje" }));
    await userEvent.click(screen.getByRole("button", { name: "Close form" }));

    expect(screen.queryByTestId("message-add-form")).not.toBeInTheDocument();
  });
});
