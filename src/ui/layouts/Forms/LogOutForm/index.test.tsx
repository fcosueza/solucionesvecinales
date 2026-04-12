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

describe("Suite de pruebas del componente LogOutForm...", () => {
  it("Debe renderizar el elemento del formulario correctamente", () => {
    render(<LogOutForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Debe renderizar el texto de la pregunta correctamente", () => {
    const textoPregunta = "¿Quieres cerrar sesión realmente?";

    render(<LogOutForm questionText={textoPregunta} />);

    expect(screen.getByText(textoPregunta)).toBeInTheDocument();
  });

  it("Debe renderizar dos botones para confirmar o cancelar la acción", () => {
    render(<LogOutForm />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
  });

  it("Debe ejecutar la acción del servidor si se hace clic en el botón de confirmación", async () => {
    const { user } = configurar(<LogOutForm />);

    await user.click(screen.getByRole("button", { name: "Yes" }));

    expect(logOutAction).toHaveBeenCalled();
  });

  it("Debe llamar a useRouter si se hace clic en el botón de cancelación", async () => {
    const { user } = configurar(<LogOutForm />);
    const enrutador = enrutadorMock();

    await user.click(screen.getByRole("button", { name: "No" }));
    expect(enrutador.back).toHaveBeenCalled();
  });

  it("Debe renderizar el texto pasado como props para pregunta y botones", async () => {
    const textoPregunta = "Testing question?";
    const textoConfirmar = "Agreed";
    const textoCancelar = "No Agreed";

    render(<LogOutForm questionText={textoPregunta} confirmText={textoConfirmar} cancelText={textoCancelar} />);

    expect(screen.getByText(textoPregunta)).toBeInTheDocument();
    expect(screen.getByText(textoConfirmar)).toBeInTheDocument();
    expect(screen.getByText(textoCancelar)).toBeInTheDocument();
  });
});
