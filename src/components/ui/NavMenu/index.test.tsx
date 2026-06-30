import { render, screen } from "@testing-library/react";
import NavMenu from ".";
import { NavItem } from "@/types";

describe("NavMenu component test suite", () => {
  it("should render the navigation element", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("should render a link appropriately", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should render a link with the correct text", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByText(links[0].text)).toBeInTheDocument();
  });

  it("should render a link with the correct href attribute", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", links[0].href);
  });

  it("should render all received links", () => {
    const links: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={links} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("should create the menu in horizontal orientation if none is specified", () => {
    const links: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={links} />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("horizontal");
  });

  it("should create the menu in vertical orientation if specified", () => {
    const links: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={links} orientation="vertical" />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("vertical");
  });
});
