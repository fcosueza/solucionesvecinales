import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types/types";
import Header from ".";

// Mock useRouter module
jest.mock("next/navigation");

// Adding method push to our useRouter mock
(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn()
});

describe("Layout Component Header test", () => {
  const links: NavItem[] = [
    { text: "testLink-1", href: "/home" },
    { text: "testLink-2", href: "/contact" },
    { text: "testLink-3", href: "/about" }
  ];

  it("Must render the Header correctly", () => {
    render(<Header links={links} buttonText="TestButton" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Must render the Logo correctly", () => {
    render(<Header links={links} buttonText="TestButton" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Must render the NavMenu if the links are passed as props", () => {
    render(<Header links={links} buttonText="TestButton" />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(links.length);
  });

  it("Must not render the NavMenu without links", () => {
    render(<Header buttonText="TestButton" />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("Must render the Button correctly", () => {
    render(<Header links={links} buttonText="TestButton" buttonRoute="/" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("It must not call router hook when the button is not clicked", async () => {
    const router = useRouter();

    render(<Header links={links} buttonText="TestButton" />);

    userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(router.push).toHaveBeenCalled());
  });

  it("It must call router hook when the button is clicked", async () => {
    const router = useRouter();

    render(<Header links={links} buttonText="TestButton" />);

    userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(router.push).toHaveBeenCalled());
  });
});
