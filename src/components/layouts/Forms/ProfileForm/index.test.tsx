import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserRole } from "@/types";
import ProfileForm from ".";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: jest.fn(actual.useActionState)
  };
});

jest.mock("@/actions/profile", () => ({
  updateProfile: jest.fn(),
  deleteProfile: jest.fn()
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const mockUseActionState = useActionState as unknown as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockRefresh = jest.fn();

const createObjectURLMock = jest.fn();
const revokeObjectURLMock = jest.fn();

const baseState = {
  state: "error" as const,
  message: ""
};

const defaultProps = {
  name: "Lucia",
  surname: "Garcia Perez",
  email: "lucia@example.com",
  role: UserRole.tenant
};

const setActionStates = ({
  updateState = baseState,
  updatePending = false,
  deleteState = baseState,
  deletePending = false
}: {
  updateState?: any;
  updatePending?: boolean;
  deleteState?: any;
  deletePending?: boolean;
}) => {
  let calls = 0;

  mockUseActionState.mockImplementation(() => {
    const isUpdateAction = calls % 2 === 0;
    calls += 1;

    if (isUpdateAction) {
      return [updateState, jest.fn(), updatePending];
    }

    return [deleteState, jest.fn(), deletePending];
  });
};

describe("ProfileForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      refresh: mockRefresh
    });

    setActionStates({});

    createObjectURLMock.mockReset();
    revokeObjectURLMock.mockReset();

    Object.defineProperty(global.URL, "createObjectURL", {
      writable: true,
      configurable: true,
      value: createObjectURLMock
    });

    Object.defineProperty(global.URL, "revokeObjectURL", {
      writable: true,
      configurable: true,
      value: revokeObjectURLMock
    });
  });

  it("renders user data, role label and form fields", () => {
    render(<ProfileForm {...defaultProps} />);

    expect(screen.getByText("Lucia Garcia")).toBeInTheDocument();
    expect(screen.getByText("Inquilino")).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Lucia");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("Garcia");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("lucia@example.com");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Guardar" })).toBeEnabled();
  });

  it("uses provided avatar image and web admin role label", () => {
    render(
      <ProfileForm
        {...defaultProps}
        role={UserRole.webAdmin}
        image="/uploads/profiles/avatar.webp"
        surname="Fernandez"
      />
    );

    expect(screen.getByText("Administrador Web")).toBeInTheDocument();
    expect(screen.getByText("Lucia Fernandez")).toBeInTheDocument();
    expect(screen.getByAltText("Foto de perfil")).toBeInTheDocument();
  });

  it("uses payload values when update state provides previous form data", () => {
    const payload = new FormData();
    payload.set("name", "Marta");
    payload.set("surname", "Lopez");
    payload.set("email", "marta@example.com");
    payload.set("password", "secret123");
    payload.set("repeat", "secret123");

    setActionStates({
      updateState: {
        state: "error",
        message: "",
        payload
      }
    });

    render(<ProfileForm {...defaultProps} />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Marta");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("Lopez");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("marta@example.com");
    expect(screen.getByLabelText("password-input")).toHaveValue("secret123");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("secret123");
  });

  it("clears name, surname and email when those fields have validation errors", () => {
    const payload = new FormData();
    payload.set("name", "Marta");
    payload.set("surname", "Lopez");
    payload.set("email", "marta@example.com");

    setActionStates({
      updateState: {
        state: "error",
        message: "Datos no válidos",
        errors: {
          name: "Nombre inválido",
          surname: "Apellido inválido",
          email: "Email inválido",
          password: "Contraseña inválida",
          repeat: "Repetición inválida"
        },
        payload
      }
    });

    render(<ProfileForm {...defaultProps} />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getAllByRole("alert")).toHaveLength(5);
  });

  it("shows update success feedback and refreshes", async () => {
    setActionStates({
      updateState: {
        state: "success",
        message: "Perfil actualizado"
      }
    });

    render(<ProfileForm {...defaultProps} />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Perfil actualizado");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("shows update error feedback", async () => {
    setActionStates({
      updateState: {
        state: "error",
        message: "No se pudo actualizar"
      }
    });

    render(<ProfileForm {...defaultProps} />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo actualizar");
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("shows delete success feedback and refreshes", async () => {
    setActionStates({
      deleteState: {
        state: "success",
        message: "Perfil eliminado"
      }
    });

    render(<ProfileForm {...defaultProps} />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Perfil eliminado");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("shows delete error feedback", async () => {
    setActionStates({
      deleteState: {
        state: "error",
        message: "No se pudo eliminar"
      }
    });

    render(<ProfileForm {...defaultProps} />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo eliminar");
    });

    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("opens blocked popup for admin with communities and closes with Entendido", async () => {
    const user = userEvent.setup();

    render(<ProfileForm {...defaultProps} role={UserRole.admin} hasCommunities />);

    await user.click(screen.getByRole("button", { name: "Eliminar perfil" }));

    expect(screen.getByRole("dialog", { name: "No puedes eliminar tu cuenta" })).toBeInTheDocument();

    const blockedDialog = screen.getByRole("dialog", { name: "No puedes eliminar tu cuenta" });
    fireEvent.click(blockedDialog);

    expect(screen.getByRole("dialog", { name: "No puedes eliminar tu cuenta" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Entendido" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "No puedes eliminar tu cuenta" })).not.toBeInTheDocument();
    });
  });

  it("closes blocked popup when clicking the overlay", async () => {
    const user = userEvent.setup();

    render(<ProfileForm {...defaultProps} role={UserRole.admin} hasCommunities />);

    await user.click(screen.getByRole("button", { name: "Eliminar perfil" }));

    const dialog = screen.getByRole("dialog", { name: "No puedes eliminar tu cuenta" });
    const overlay = dialog.parentElement as HTMLElement;

    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "No puedes eliminar tu cuenta" })).not.toBeInTheDocument();
    });
  });

  it("falls back to empty first surname when split result is empty", () => {
    const splitSpy = jest.spyOn(String.prototype, "split").mockReturnValueOnce([] as unknown as string[]);

    render(<ProfileForm {...defaultProps} surname="   " />);

    expect(screen.getByText("Lucia")).toBeInTheDocument();

    splitSpy.mockRestore();
  });

  it("opens delete confirmation for tenant and closes with cancel or overlay", async () => {
    const user = userEvent.setup();

    render(<ProfileForm {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Eliminar perfil" }));

    expect(screen.getByRole("dialog", { name: "Confirmar eliminacion" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Confirmar eliminacion" })).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Eliminar perfil" }));

    const dialog = screen.getByRole("dialog", { name: "Confirmar eliminacion" });
    const overlay = dialog.parentElement as HTMLElement;

    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Confirmar eliminacion" })).not.toBeInTheDocument();
    });
  });

  it("keeps delete popup open while deleting and disables related buttons", async () => {
    const user = userEvent.setup();

    setActionStates({
      deletePending: true
    });

    render(<ProfileForm {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Guardar" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Eliminar perfil" }));

    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Eliminando..." })).toBeDisabled();

    const dialog = screen.getByRole("dialog", { name: "Confirmar eliminacion" });
    const overlay = dialog.parentElement as HTMLElement;

    await user.click(overlay);

    expect(screen.getByRole("dialog", { name: "Confirmar eliminacion" })).toBeInTheDocument();
  });

  it("handles avatar upload preview, button trigger, and revokes object URLs", async () => {
    const user = userEvent.setup();
    createObjectURLMock.mockReturnValueOnce("blob:avatar-1").mockReturnValueOnce("blob:avatar-2");

    const clickSpy = jest.spyOn(HTMLInputElement.prototype, "click");
    const { container, unmount } = render(<ProfileForm {...defaultProps} />);

    const fileInput = container.querySelector('input[type="file"][name="imagen"]') as HTMLInputElement;

    await user.click(screen.getByRole("button", { name: "Subir foto de perfil" }));
    expect(clickSpy).toHaveBeenCalledTimes(1);

    fireEvent.change(fileInput, { target: { files: [] } });
    expect(createObjectURLMock).not.toHaveBeenCalled();

    const firstFile = new File(["a"], "avatar-1.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [firstFile] } });

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);

    const secondFile = new File(["b"], "avatar-2.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [secondFile] } });

    expect(createObjectURLMock).toHaveBeenCalledTimes(2);
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:avatar-1");

    unmount();

    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:avatar-2");

    clickSpy.mockRestore();
  });
});
