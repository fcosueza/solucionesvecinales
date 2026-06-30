import { render, screen } from "@testing-library/react";
import { SocialIcon } from "@/types";
import Social from ".";

describe("Social component test suite", () => {
  it("Should render the container correctly", () => {
    render(<Social icons={[]} />);
    expect(screen.getByLabelText("social")).toBeInTheDocument();
  });

  it("Should render one icon correctly", () => {
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

  it("Should render all received icons", () => {
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
