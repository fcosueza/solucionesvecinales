import { render, screen } from "@testing-library/react";
import SonnerToaster from ".";

// El Toaster de Sonner es un componente third-party, así que nosotros testeamos nuestro wrapper.
jest.mock("sonner", () => ({
  Toaster: ({
    position,
    closeButton,
    richColors,
    toastOptions
  }: {
    position?: string;
    closeButton?: boolean;
    richColors?: boolean;
    toastOptions?: { duration?: number };
  }) => (
    <div
      data-testid="sonner-toaster"
      data-position={position}
      data-close-button={closeButton ? "true" : "false"}
      data-rich-colors={richColors ? "true" : "false"}
      data-duration={toastOptions?.duration}
    />
  )
}));

describe("Suite de pruebas del componente SonnerToaster", () => {
  it("Debe renderizar el componente contenedor", () => {
    const { container } = render(<SonnerToaster />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("Debe renderizar el Toaster de Sonner", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toBeInTheDocument();
  });

  it("Debe configurar la posición en top-right", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-position", "top-right");
  });

  it("Debe habilitar el botón de cierre", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-close-button", "true");
  });

  it("Debe habilitar richColors", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-rich-colors", "true");
  });

  it("Debe configurar la duración del toast en 4000ms", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-duration", "4000");
  });
});
