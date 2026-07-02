import { createZone } from "@/actions/community/communityZone";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AddZoneForm from ".";

jest.mock("@/actions/community/communityZone", () => ({
  createZone: jest.fn()
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

describe("AddZoneForm", () => {
  const mockRefresh = jest.fn();
  const mockOnClose = jest.fn();

  const mockCreateZone = createZone as jest.MockedFunction<typeof createZone>;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      refresh: mockRefresh
    });

    mockCreateZone.mockResolvedValue({
      state: "error",
      message: "fallback"
    });
  });

  it("renders all form fields", () => {
    const { container } = render(<AddZoneForm communityID={12} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Nombre de la zona")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Describe la zona...")).toBeInTheDocument();
    expect(container.querySelectorAll('input[type="time"]')).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument();
  });

  it("updates the description counter", async () => {
    const user = userEvent.setup();
    render(<AddZoneForm communityID={12} onClose={mockOnClose} />);

    await user.type(screen.getByPlaceholderText("Describe la zona..."), "abcde");

    expect(screen.getByText("5 / 100")).toBeInTheDocument();
  });

  it("submits the form and closes modal on success", async () => {
    const user = userEvent.setup();

    mockCreateZone.mockResolvedValue({
      state: "success",
      message: "Zona común creada correctamente"
    });

    render(<AddZoneForm communityID={12} onClose={mockOnClose} />);

    await user.type(screen.getByPlaceholderText("Nombre de la zona"), "Piscina");
    await user.type(screen.getByPlaceholderText("Describe la zona..."), "Zona para verano");

    const timeInputs = document.querySelectorAll('input[type="time"]') as NodeListOf<HTMLInputElement>;
    await user.type(timeInputs[0], "08:00");
    await user.type(timeInputs[1], "22:00");

    await user.click(screen.getByRole("button", { name: "Crear" }));

    await waitFor(() => {
      expect(mockCreateZone).toHaveBeenCalledTimes(1);
    });

    const [communityID, formData] = mockCreateZone.mock.calls[0];
    expect(communityID).toBe(12);
    expect(formData.get("nombre")).toBe("Piscina");
    expect(formData.get("descripcion")).toBe("Zona para verano");
    expect(formData.get("horaInicio")).toBe("08:00");
    expect(formData.get("horaFin")).toBe("22:00");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Zona común creada correctamente");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("shows error toast and keeps modal open when action fails", async () => {
    const user = userEvent.setup();

    mockCreateZone.mockResolvedValue({
      state: "error",
      message: "No se pudo crear la zona común"
    });

    render(<AddZoneForm communityID={12} onClose={mockOnClose} />);

    await user.type(screen.getByPlaceholderText("Nombre de la zona"), "Piscina");
    await user.type(screen.getByPlaceholderText("Describe la zona..."), "Zona para verano");

    const timeInputs = document.querySelectorAll('input[type="time"]') as NodeListOf<HTMLInputElement>;
    await user.type(timeInputs[0], "08:00");
    await user.type(timeInputs[1], "22:00");

    await user.click(screen.getByRole("button", { name: "Crear" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo crear la zona común");
    });

    expect(mockRefresh).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("closes when clicking on overlay, but not when clicking inside popup", async () => {
    const user = userEvent.setup();
    const { container } = render(<AddZoneForm communityID={12} onClose={mockOnClose} />);

    const overlay = container.firstChild as HTMLElement;
    await user.click(screen.getByRole("heading", { name: "Nueva zona común" }));
    expect(mockOnClose).not.toHaveBeenCalled();

    await user.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
