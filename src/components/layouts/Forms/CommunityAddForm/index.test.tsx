import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommunityAddForm from ".";
import addCommunity from "@/actions/addCommunity";
import { toast } from "sonner";

const pushMock = jest.fn();

// Mock de módulos y funciones
jest.mock("@/actions/addCommunity", () => jest.fn());
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

describe("Suite de pruebas del componente CommunityAddForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe renderizar el formulario y todos sus campos", () => {
    render(<CommunityAddForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "street-input" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "number-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "city-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "province-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "country-input" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear comunidad" })).toBeInTheDocument();
  });

  it("Debe reflejar lo que escribe el usuario en todos los campos", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
    expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
    expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
    expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
    expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
    expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
  });

  it("Debe limpiar únicamente el campo con error y mantener el resto", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const datosFormulario = new FormData();

    datosFormulario.append("name", "X");
    datosFormulario.append("street", "Calle Mayor");
    datosFormulario.append("number", "12");
    datosFormulario.append("city", "Madrid");
    datosFormulario.append("province", "Madrid");
    datosFormulario.append("country", "España");

    accionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        name: "El nombre no es válido"
      },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "X");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
      expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
      expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
    });
  });

  it("Debe limpiar el campo calle cuando street tiene error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const datosFormulario = new FormData();

    datosFormulario.append("name", "Comunidad Centro");
    datosFormulario.append("street", "X");
    datosFormulario.append("number", "12");
    datosFormulario.append("city", "Madrid");
    datosFormulario.append("province", "Madrid");
    datosFormulario.append("country", "España");

    accionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        street: "La calle no es válida"
      },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "X");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
      expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
      expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
    });
  });

  it("Debe limpiar el campo número cuando number tiene error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const datosFormulario = new FormData();

    datosFormulario.append("name", "Comunidad Centro");
    datosFormulario.append("street", "Calle Mayor");
    datosFormulario.append("number", "0");
    datosFormulario.append("city", "Madrid");
    datosFormulario.append("province", "Madrid");
    datosFormulario.append("country", "España");

    accionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        number: "El número debe ser mayor que 0"
      },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "0");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect((screen.getByRole("spinbutton", { name: "number-input" }) as HTMLInputElement).value).toBe("");
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
      expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
      expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
    });
  });

  it("Debe limpiar el campo ciudad cuando city tiene error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const datosFormulario = new FormData();

    datosFormulario.append("name", "Comunidad Centro");
    datosFormulario.append("street", "Calle Mayor");
    datosFormulario.append("number", "12");
    datosFormulario.append("city", "X");
    datosFormulario.append("province", "Madrid");
    datosFormulario.append("country", "España");

    accionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        city: "La ciudad no es válida"
      },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "X");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
      expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
      expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
      expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
    });
  });

  it("Debe limpiar el campo provincia cuando province tiene error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const datosFormulario = new FormData();

    datosFormulario.append("name", "Comunidad Centro");
    datosFormulario.append("street", "Calle Mayor");
    datosFormulario.append("number", "12");
    datosFormulario.append("city", "Madrid");
    datosFormulario.append("province", "X");
    datosFormulario.append("country", "España");

    accionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        province: "La provincia no es válida"
      },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "X");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
      expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
      expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
      expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("España");
    });
  });

  it("Debe limpiar el campo país cuando country tiene error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const datosFormulario = new FormData();

    datosFormulario.append("name", "Comunidad Centro");
    datosFormulario.append("street", "Calle Mayor");
    datosFormulario.append("number", "12");
    datosFormulario.append("city", "Madrid");
    datosFormulario.append("province", "Madrid");
    datosFormulario.append("country", "X");

    accionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        country: "El país no es válido"
      },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "X");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "country-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("Comunidad Centro");
      expect(screen.getByRole("textbox", { name: "street-input" })).toHaveValue("Calle Mayor");
      expect(screen.getByRole("spinbutton", { name: "number-input" })).toHaveValue(12);
      expect(screen.getByRole("textbox", { name: "city-input" })).toHaveValue("Madrid");
      expect(screen.getByRole("textbox", { name: "province-input" })).toHaveValue("Madrid");
    });
  });

  it("Debe llamar a toast.error cuando la acción devuelve error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const mensaje = "No se pudo crear la comunidad";

    accionMock.mockResolvedValue({
      state: "error",
      message: mensaje
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(mensaje);
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("Debe llamar a toast.success y redirigir al overview cuando la acción tiene éxito", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const accionMock = addCommunity as jest.Mock;
    const mensaje = "Comunidad creada exitosamente";

    accionMock.mockResolvedValue({
      state: "success",
      message: mensaje
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mensaje);
      expect(pushMock).toHaveBeenCalledWith("/communities");
    });
    expect(toast.error).not.toHaveBeenCalled();
  });
});
