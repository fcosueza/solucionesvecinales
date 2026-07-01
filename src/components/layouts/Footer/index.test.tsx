import { render, screen } from "@testing-library/react";
import { NavItem, SocialIcon } from "@/types";
import Footer from ".";

describe("Footer component test suite", () => {
  const links: NavItem[] = [
    { text: "Home", href: "#" },
    { text: "Features", href: "#about" },
    { text: "Contact", href: "#contact" },
    { text: "Login", href: "#login" }
  ];

  const icons: SocialIcon[] = [
    {
      src: "/assets/icons/facebook.png",
      altText: "Facebook Icon",
      url: "https://www.facebook.com/",
      title: "Facebook",
      width: 50,
      height: 50
    },
    {
      src: "/assets/icons/github.png",
      altText: "Github Icon",
      url: "https://www.github.com/",
      title: "Github",
      width: 50,
      height: 50
    }
  ];

  it("Should render the footer container correctly", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("Should render the menu with the provided links vertically", () => {
    render(<Footer links={links} socialIcons={[]} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(links.length);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("vertical");
  });

  it("Should render the provided social icons", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByLabelText("social")).toBeInTheDocument();
  });

  it("Should render the app logo when withLogo is enabled", () => {
    render(<Footer links={links} socialIcons={icons} withLogo={true} />);

    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument();
  });

  it("Should not render the menu if no links are provided", () => {
    render(<Footer socialIcons={icons} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("Should not render social icons if none are provided", () => {
    render(<Footer links={links} />);

    expect(screen.queryByRole("social")).not.toBeInTheDocument();
  });

  it("Should not render the logo when withLogo is false", () => {
    render(<Footer socialIcons={icons} withLogo={false} />);

    expect(screen.queryByRole("logo")).not.toBeInTheDocument();
  });
});
