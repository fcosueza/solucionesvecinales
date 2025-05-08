import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Card component test suite...", () => {
  const imageURL = "/assets/image/doc.svg";
  const altText = "Imagen de unos documentos";
  const title = "Lorem Ipsum Dolor";
  const para = "Lorem Ipsum Dolor sit atmet consecterum";

  it("Should render a Card correctly", () => {
    render(<Card imageURL={imageURL} imageAltText={altText} cardTitle={title} cardPara={para} />);

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("Should render a Card with the specified image url, width and height", () => {
    const imgWidth = 120;
    const imgHeight = 200;

    render(
      <Card
        imageURL={imageURL}
        imageAltText={altText}
        imageWidth={imgWidth}
        imageHeight={imgHeight}
        cardTitle={title}
        cardPara={para}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("width", imgWidth);
    expect(screen.getByRole("img")).toHaveProperty("height", imgHeight);
  });

  it("Should render a Card with the specified title", () => {
    render(<Card imageURL={imageURL} imageAltText={altText} cardTitle={title} cardPara={para} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("Should render a Card with the specified paragraph", () => {
    render(<Card imageURL={imageURL} imageAltText={altText} cardTitle={title} cardPara={para} />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
    expect(screen.getByText(para)).toBeInTheDocument();
  });
});
