import { render, screen } from "@testing-library/react";
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

describe("Layout Component Header test suite", () => {
  const enlaces: NavItem[] = [
    { text: "testLink-1", href: "/home" },
    { text: "testLink-2", href: "/contact" },
    { text: "testLink-3", href: "/about" }
  ];

  it("Should render the Header correctly", () => {
    render(<Header links={enlaces} buttonText="TestButton" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Should render the Logo correctly", () => {
    render(<Header links={enlaces} buttonText="TestButton" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Should render the NavMenu if the links are passed as props", () => {
    render(<Header links={enlaces} buttonText="TestButton" />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(enlaces.length);
  });

  it("Should not render the NavMenu without links", () => {
    render(<Header buttonText="TestButton" />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("Should render the Button correctly", () => {
    render(<Header links={enlaces} buttonText="TestButton" buttonRoute="/" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("Should not call router hook when the button is not clicked", async () => {
    const enrutador = enrutadorMock();

    render(<Header links={enlaces} buttonText="TestButton" />);

    expect(enrutador.push).not.toHaveBeenCalled();
  });

  it("Should call router hook when the button is clicked", async () => {
    const enrutador = enrutadorMock();

    render(<Header links={enlaces} buttonText="TestButton" />);

    await userEvent.click(screen.getByRole("button"));
    expect(enrutador.push).toHaveBeenCalled();
  });
});
