import { render, screen } from "@testing-library/react";
import { NavItemData, NavMenu } from ".";

describe("Tests del componente NavMenu...", () => {
  it("Debe renderizar un enlace de forma apropiada.", () => {
    const links: NavItemData[] = [{ text: "testLink", url: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("Debe renderizar un enlace con el texto adecuado.", () => {
    const links: NavItemData[] = [{ text: "testLink", url: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByText(links[0].text)).toBeInTheDocument();
  });

  it("Debe renderizar un enlace con el atributo href correctamente", () => {
    const links: NavItemData[] = [{ text: "testLink", url: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", links[0].url);
  });
});
