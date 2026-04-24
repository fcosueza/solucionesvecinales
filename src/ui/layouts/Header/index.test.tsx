import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter as enrutadorMock } from "next/navigation";
import { NavItem } from "@/types";
import Header from ".";

// Simula el módulo useRouter.
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Agrega el método push al mock de useRouter.
(enrutadorMock as jest.Mock).mockReturnValue({
  push: jest.fn()
});

describe("Suite de pruebas de Header", () => {
  const enlaces: NavItem[] = [
    { text: "testLink-1", href: "/home" },
    { text: "testLink-2", href: "/contact" },
    { text: "testLink-3", href: "/about" }
  ];

  it("Debe renderizar el Header correctamente", () => {
    render(<Header links={enlaces} buttonText="TestButton" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Debe renderizar el Logo correctamente", () => {
    render(<Header links={enlaces} buttonText="TestButton" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Debe renderizar el NavMenu si se pasan enlaces por props", () => {
    render(<Header links={enlaces} buttonText="TestButton" />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(enlaces.length);
  });

  it("No debe renderizar el NavMenu sin enlaces", () => {
    render(<Header buttonText="TestButton" />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("Debe renderizar el Button correctamente", () => {
    render(<Header links={enlaces} buttonText="TestButton" buttonRoute="/" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("No debe llamar al hook del router cuando no se hace click en el botón", async () => {
    const enrutador = enrutadorMock();

    render(<Header links={enlaces} buttonText="TestButton" />);

    expect(enrutador.push).not.toHaveBeenCalled();
  });

  it("Debe llamar al hook del router cuando se hace click en el botón", async () => {
    const enrutador = enrutadorMock();

    render(<Header links={enlaces} buttonText="TestButton" />);

    await userEvent.click(screen.getByRole("button"));
    expect(enrutador.push).toHaveBeenCalled();
  });

  it("No debe mostrar sombra si la página está al inicio", () => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true
    });

    render(<Header links={enlaces} buttonText="TestButton" />);

    expect(screen.getByRole("banner")).not.toHaveClass("header--scrolled");
  });

  it("Debe añadir sombra al hacer scroll", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true
    });

    render(<Header links={enlaces} buttonText="TestButton" />);

    Object.defineProperty(window, "scrollY", {
      value: 100,
      writable: true,
      configurable: true
    });
    
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByRole("banner")).toHaveClass("header--scrolled");
    });
  });
});
