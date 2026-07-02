import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommunityAddForm from ".";
import addCommunity from "@/actions/community/community";
import { toast } from "sonner";

const pushMock = jest.fn();

// Module and function mocks
jest.mock("@/actions/community/community", () => jest.fn());
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

describe("CommunityAddForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form and all fields", () => {
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

  it("should reflect user input in all fields", async () => {
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

  it("should clear only the field with an error and keep the rest", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const formData = new FormData();

    formData.append("name", "X");
    formData.append("street", "Calle Mayor");
    formData.append("number", "12");
    formData.append("city", "Madrid");
    formData.append("province", "Madrid");
    formData.append("country", "España");

    actionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        name: "El nombre no es válido"
      },
      payload: formData
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

  it("should clear street when street has an error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const formData = new FormData();

    formData.append("name", "Comunidad Centro");
    formData.append("street", "X");
    formData.append("number", "12");
    formData.append("city", "Madrid");
    formData.append("province", "Madrid");
    formData.append("country", "España");

    actionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        street: "La calle no es válida"
      },
      payload: formData
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

  it("should clear number when number has an error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const formData = new FormData();

    formData.append("name", "Comunidad Centro");
    formData.append("street", "Calle Mayor");
    formData.append("number", "0");
    formData.append("city", "Madrid");
    formData.append("province", "Madrid");
    formData.append("country", "España");

    actionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        number: "El número debe ser mayor que 0"
      },
      payload: formData
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

  it("should clear city when city has an error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const formData = new FormData();

    formData.append("name", "Comunidad Centro");
    formData.append("street", "Calle Mayor");
    formData.append("number", "12");
    formData.append("city", "X");
    formData.append("province", "Madrid");
    formData.append("country", "España");

    actionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        city: "La ciudad no es válida"
      },
      payload: formData
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

  it("should clear province when province has an error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const formData = new FormData();

    formData.append("name", "Comunidad Centro");
    formData.append("street", "Calle Mayor");
    formData.append("number", "12");
    formData.append("city", "Madrid");
    formData.append("province", "X");
    formData.append("country", "España");

    actionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        province: "La provincia no es válida"
      },
      payload: formData
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

  it("should clear country when country has an error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const formData = new FormData();

    formData.append("name", "Comunidad Centro");
    formData.append("street", "Calle Mayor");
    formData.append("number", "12");
    formData.append("city", "Madrid");
    formData.append("province", "Madrid");
    formData.append("country", "X");

    actionMock.mockResolvedValue({
      state: "error",
      message: "Datos del formulario incorrectos",
      errors: {
        country: "El país no es válido"
      },
      payload: formData
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

  it("should call toast.error when the action returns an error", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const message = "No se pudo crear la comunidad";

    actionMock.mockResolvedValue({
      state: "error",
      message
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(message);
    });

    expect(toast.success).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("should call toast.success and redirect to overview when the action succeeds", async () => {
    const user = userEvent.setup();
    render(<CommunityAddForm />);
    const actionMock = addCommunity as jest.Mock;
    const message = "Comunidad creada exitosamente";

    actionMock.mockResolvedValue({
      state: "success",
      message
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "Comunidad Centro");
    await user.type(screen.getByRole("textbox", { name: "street-input" }), "Calle Mayor");
    await user.type(screen.getByRole("spinbutton", { name: "number-input" }), "12");
    await user.type(screen.getByRole("textbox", { name: "city-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "province-input" }), "Madrid");
    await user.type(screen.getByRole("textbox", { name: "country-input" }), "España");
    await user.click(screen.getByRole("button", { name: "Crear comunidad" }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(message);
      expect(pushMock).toHaveBeenCalledWith("/communities");
    });
    expect(toast.error).not.toHaveBeenCalled();
  });
});
