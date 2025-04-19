import { render, screen } from "@testing-library/react";
import { MediaItem } from "@/types/types";
import Social from ".";

describe("Tests del componente Social...", () => {
  it("Debe renderizar el contenedor de forma adecuada", () => {
    render(<Social icons={[]} />);
    expect(screen.getByRole("social")).toBeInTheDocument();
  });

  it("Debe renderizar un icono de forma adecuada", () => {
    const icons: MediaItem[] = [
      {
        url: "/assets/icons/facebook.png",
        altText: "Facebook Icon",
        title: "Facebook",
        width: 50,
        height: 50
      }
    ];

    render(<Social icons={icons} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("title", "Facebook");
  });

  it("Debe renderizar todos los iconos que se le pasen de forma adecuada", () => {
    const icons: MediaItem[] = [
      {
        url: "/assets/icons/facebook.png",
        altText: "Facebook Icon",
        title: "Facebook",
        width: 50,
        height: 50
      },
      {
        url: "/assets/icons/linkedin.png",
        altText: "LinkedIn Icon",
        title: "LinkedIn",
        width: 50,
        height: 50
      }
    ];

    render(<Social icons={icons} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
