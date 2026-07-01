import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter as routerMock } from "next/navigation";
import { NavItem } from "@/types";
import Header from ".";

// Simulates the useRouter module.
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Add the push method to the useRouter mock.
(routerMock as jest.Mock).mockReturnValue({
  push: jest.fn()
});

describe("Header test suite", () => {
  const links: NavItem[] = [
    { text: "testLink-1", href: "/home" },
    { text: "testLink-2", href: "/contact" },
    { text: "testLink-3", href: "/about" }
  ];

  it("Should render the Header correctly", () => {
    render(<Header links={links} buttonText="TestButton" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Should apply the specified background variant", () => {
    render(<Header links={links} backgroundVariant="highlight" />);

    expect(screen.getByRole("banner")).toHaveClass("header--highlight");
  });

  it("Should render the logo correctly", () => {
    render(<Header links={links} buttonText="TestButton" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Should render the NavMenu when links are passed via props", () => {
    render(<Header links={links} buttonText="TestButton" />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(links.length);
  });

  it("Should not render the NavMenu without links", () => {
    render(<Header buttonText="TestButton" />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("Should render the button correctly", () => {
    render(<Header links={links} buttonText="TestButton" buttonRoute="/" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should not render the button if buttonText is not provided", () => {
    render(<Header links={links} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("Should not call the router hook when the button is not clicked", async () => {
    const router = routerMock();

    render(<Header links={links} buttonText="TestButton" />);

    expect(router.push).not.toHaveBeenCalled();
  });

  it("Should call the router hook when the button is clicked", async () => {
    const router = routerMock();

    render(<Header links={links} buttonText="TestButton" />);

    await userEvent.click(screen.getByRole("button"));
    expect(router.push).toHaveBeenCalled();
  });

  it("Should not show shadow when the page is at the top", () => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true
    });

    render(<Header links={links} buttonText="TestButton" />);

    expect(screen.getByRole("banner")).not.toHaveClass("header--scrolled");
  });

  it("Should add shadow on scroll", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true
    });

    render(<Header links={links} buttonText="TestButton" />);

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
