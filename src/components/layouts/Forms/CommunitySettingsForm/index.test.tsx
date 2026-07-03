import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CommunitySettingsForm from ".";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: jest.fn(actual.useActionState)
  };
});

jest.mock("@/actions/community/communitySettings", () => ({
  updateCommunity: jest.fn(),
  deleteCommunity: jest.fn()
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

const mockRefresh = jest.fn();
const mockUseActionState = useActionState as unknown as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

const props = {
  communityID: 7,
  name: "Comunidad Centro",
  street: "Calle Mayor",
  number: 12,
  city: "Madrid",
  province: "Madrid",
  country: "España"
};

describe("CommunitySettingsForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      refresh: mockRefresh
    });

    mockUseActionState.mockImplementation((_action, initialState) => [initialState, jest.fn(), false]);
  });

  it("renders the current community data and toggles the delete confirmation", async () => {
    const user = userEvent.setup();

    render(<CommunitySettingsForm {...props} />);

    expect(screen.getByAltText("Imagen de la comunidad Comunidad Centro")).toBeInTheDocument();
    expect(screen.getByText("Comunidad Centro")).toBeInTheDocument();
    expect(screen.getByText(/Calle Mayor,\s*12/)).toBeInTheDocument();
    expect(screen.getByText(/Madrid,\s*Madrid/)).toBeInTheDocument();
    expect(screen.getByText("España")).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
    expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
    expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
    expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
    expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
    expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");

    await user.click(screen.getByRole("button", { name: "Eliminar comunidad" }));

    expect(screen.getByRole("dialog", { name: "Confirmar eliminación" })).toBeInTheDocument();
    expect(screen.getByText(/Esta accion eliminara la comunidad/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Confirmar eliminación" })).not.toBeInTheDocument();
    });
  });

  it("closes the delete confirmation when clicking the overlay", async () => {
    const user = userEvent.setup();

    render(<CommunitySettingsForm {...props} />);

    await user.click(screen.getByRole("button", { name: "Eliminar comunidad" }));

    const dialog = screen.getByRole("dialog", { name: "Confirmar eliminación" });
    const overlay = dialog.parentElement as HTMLElement;

    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Confirmar eliminación" })).not.toBeInTheDocument();
    });
  });

  it("shows an error toast when the update action returns an error", async () => {
    mockUseActionState
      .mockReturnValueOnce([
        {
          state: "error",
          message: "No se pudo actualizar la comunidad"
        },
        jest.fn(),
        false
      ])
      .mockReturnValueOnce([
        {
          state: "error",
          message: ""
        },
        jest.fn(),
        false
      ]);

    render(<CommunitySettingsForm {...props} />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo actualizar la comunidad");
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("prefills inputs from the action payload and disables save while the update is pending", () => {
    const payload = new FormData();

    payload.set("name", "Comunidad Norte");
    payload.set("street", "Avenida del Sol");
    payload.set("number", "24");
    payload.set("city", "Sevilla");
    payload.set("province", "Andalucía");
    payload.set("country", "España");

    mockUseActionState
      .mockReturnValueOnce([
        {
          state: "error",
          message: "",
          payload
        },
        jest.fn(),
        true
      ])
      .mockReturnValueOnce([
        {
          state: "error",
          message: ""
        },
        jest.fn(),
        false
      ]);

    render(<CommunitySettingsForm {...props} />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Norte");
    expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Avenida del Sol");
    expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(24);
    expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Sevilla");
    expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Andalucía");
    expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
    expect(screen.getByRole("button", { name: "Guardar" })).toBeDisabled();
  });

  it("clears only the invalid fields when the update action returns field errors", () => {
    const payload = new FormData();

    payload.set("name", "Comunidad Norte");
    payload.set("street", "Avenida del Sol");
    payload.set("number", "24");
    payload.set("city", "Sevilla");
    payload.set("province", "Andalucía");
    payload.set("country", "España");

    mockUseActionState
      .mockReturnValueOnce([
        {
          state: "error",
          message: "Datos del formulario incorrectos",
          errors: {
            name: "El nombre no es válido",
            street: "La calle no es válida",
            number: "El número no es válido",
            city: "La ciudad no es válida",
            province: "La provincia no es válida",
            country: "El país no es válido"
          },
          payload
        },
        jest.fn(),
        false
      ])
      .mockReturnValueOnce([
        {
          state: "error",
          message: ""
        },
        jest.fn(),
        false
      ]);

    render(<CommunitySettingsForm {...props} />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("");
    expect((screen.getByRole("spinbutton", { name: "number-input" }) as HTMLInputElement).value).toBe("");
    expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("");
    expect(screen.getAllByRole("alert")).toHaveLength(6);
  });

  it("shows a success toast and refreshes the page when the update action succeeds", async () => {
    mockUseActionState
      .mockReturnValueOnce([
        {
          state: "success",
          message: "Comunidad actualizada correctamente"
        },
        jest.fn(),
        false
      ])
      .mockReturnValueOnce([
        {
          state: "error",
          message: ""
        },
        jest.fn(),
        false
      ]);

    render(<CommunitySettingsForm {...props} />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Comunidad actualizada correctamente");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("shows an error toast when the delete action returns an error", async () => {
    mockUseActionState
      .mockReturnValueOnce([
        {
          state: "error",
          message: ""
        },
        jest.fn(),
        false
      ])
      .mockReturnValueOnce([
        {
          state: "error",
          message: "No se pudo eliminar la comunidad"
        },
        jest.fn(),
        false
      ]);

    render(<CommunitySettingsForm {...props} />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo eliminar la comunidad");
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("keeps the delete confirmation open and disables its actions while deleting", async () => {
    const user = userEvent.setup();
    let actionStateCallCount = 0;

    mockUseActionState.mockImplementation(() => {
      const isUpdateAction = actionStateCallCount % 2 === 0;
      actionStateCallCount += 1;

      return [
        {
          state: "error",
          message: ""
        },
        jest.fn(),
        isUpdateAction ? false : true
      ];
    });

    render(<CommunitySettingsForm {...props} />);

    await user.click(screen.getByRole("button", { name: "Eliminar comunidad" }));

    expect(screen.getByRole("button", { name: "Guardar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Eliminando..." })).toBeDisabled();

    const dialog = screen.getByRole("dialog", { name: "Confirmar eliminación" });
    const overlay = dialog.parentElement as HTMLElement;

    await user.click(overlay);

    expect(screen.getByRole("dialog", { name: "Confirmar eliminación" })).toBeInTheDocument();
  });
});
