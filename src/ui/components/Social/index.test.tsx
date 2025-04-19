import { render, screen } from "@testing-library/react";
import { SocialIcon } from "@/types/types";
import Social from ".";

describe("Tests del componente Social...", () => {
  it("Debe renderizar el contenedor de forma adecuada", () => {
    render(<Social icons={[]} />);
    expect(screen.getByRole("social")).toBeInTheDocument();
  });

  it("Debe renderizar un icono de forma adecuada", () => {
    const icons: SocialIcon[] = [
      {
        src: "/assets/icons/facebook.png",
        url: "https://www.facebook.com/",
        altText: "Facebook Icon",
        title: "Facebook",
        width: 50,
        height: 50
      }
    ];

    render(<Social icons={icons} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("title", "Facebook");
  });

  it("Debe renderizar todos los iconos que se le pasen de forma adecuada", () => {
    const icons: SocialIcon[] = [
      {
        src: "/assets/icons/facebook.png",
        url: "https://www.facebook.com/",
        altText: "Facebook Icon",
        title: "Facebook",
        width: 50,
        height: 50
      },
      {
        src: "/assets/icons/linkedin.png",
        url: "https://www.facebook.com/",
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
