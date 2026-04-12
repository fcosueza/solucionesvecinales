import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogOutForm from ".";
import logOutAction from "@/actions/auth/logOutAction";
import { useRouter as enrutadorMock } from "next/navigation";

// Simula la Server Action logOutAction.
jest.mock("@/actions/auth/logOutAction");

// Simula el módulo useRouter.
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Agrega el método back al mock de useRouter.
(enrutadorMock as jest.Mock).mockReturnValue({
  back: jest.fn()
});

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("LogOutForm component test suite...", () => {
  it("Should render the form element correctly", () => {
    render(<LogOutForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the question text correctly", () => {
    const textoPregunta = "¿Quieres cerrar sesión realmente?";

    render(<LogOutForm questionText={textoPregunta} />);

    expect(screen.getByText(textoPregunta)).toBeInTheDocument();
  });

  it("Should render two buttons to confirm or cancel action", () => {
    render(<LogOutForm />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
  });

  it("Should call server action if the confirm button is clicked", async () => {
    const { user } = configurar(<LogOutForm />);

    await user.click(screen.getByRole("button", { name: "Yes" }));

    expect(logOutAction).toHaveBeenCalled();
  });

  it("Should call useRouter if the cancel button is clicked", async () => {
    const { user } = configurar(<LogOutForm />);
    const enrutador = enrutadorMock();

    await user.click(screen.getByRole("button", { name: "No" }));
    expect(enrutador.back).toHaveBeenCalled();
  });

  it("It should render the text passed has props for quesiton and buttons", async () => {
    const textoPregunta = "Testing question?";
    const textoConfirmar = "Agreed";
    const textoCancelar = "No Agreed";

    render(<LogOutForm questionText={textoPregunta} confirmText={textoConfirmar} cancelText={textoCancelar} />);

    expect(screen.getByText(textoPregunta)).toBeInTheDocument();
    expect(screen.getByText(textoConfirmar)).toBeInTheDocument();
    expect(screen.getByText(textoCancelar)).toBeInTheDocument();
  });
});
