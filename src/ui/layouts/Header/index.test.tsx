import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter as mockUseRouter } from "next/navigation";
import { NavItem } from "@/types";
import Header from ".";

// Mock useRouter module
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Adding method push to our useRouter mock
(mockUseRouter as jest.Mock).mockReturnValue({
  push: jest.fn()
});

describe("Layout Component Header test suite", () => {
  const links: NavItem[] = [
    { text: "testLink-1", href: "/home" },
    { text: "testLink-2", href: "/contact" },
    { text: "testLink-3", href: "/about" }
  ];

  it("Should render the Header correctly", () => {
    render(<Header links={links} buttonText="TestButton" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Should render the Logo correctly", () => {
    render(<Header links={links} buttonText="TestButton" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Should render the NavMenu if the links are passed as props", () => {
    render(<Header links={links} buttonText="TestButton" />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(links.length);
  });

  it("Should not render the NavMenu without links", () => {
    render(<Header buttonText="TestButton" />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("Should render the Button correctly", () => {
    render(<Header links={links} buttonText="TestButton" buttonRoute="/" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("Should not call router hook when the button is not clicked", async () => {
    const router = mockUseRouter();

    render(<Header links={links} buttonText="TestButton" />);

    expect(router.push).not.toHaveBeenCalled();
  });

  it("Should call router hook when the button is clicked", async () => {
    const router = mockUseRouter();

    render(<Header links={links} buttonText="TestButton" />);

    await userEvent.click(screen.getByRole("button"));
    expect(router.push).toHaveBeenCalled();
  });
});
