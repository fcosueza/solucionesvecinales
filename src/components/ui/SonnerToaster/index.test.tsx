import { render, screen } from "@testing-library/react";
import SonnerToaster from ".";

// Sonner's Toaster is a third-party component, so we test our wrapper.
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

describe("SonnerToaster component test suite", () => {
  it("Should render the wrapper component", () => {
    const { container } = render(<SonnerToaster />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("Should render Sonner's Toaster", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toBeInTheDocument();
  });

  it("Should set the position to top-right", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-position", "top-right");
  });

  it("Should enable the close button", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-close-button", "true");
  });

  it("Should enable richColors", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-rich-colors", "true");
  });

  it("Should set the toast duration to 4000ms", () => {
    render(<SonnerToaster />);

    expect(screen.getByTestId("sonner-toaster")).toHaveAttribute("data-duration", "4000");
  });
});
