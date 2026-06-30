import { render, screen } from "@testing-library/react";
import CardFeatures from ".";

describe("CardFeatures component test suite", () => {
  const imageURL = "/assets/image/doc.svg";
  const altText = "Imagen de unos documentos";
  const title = "Lorem Ipsum Dolor";
  const paragraph = "Lorem Ipsum Dolor sit atmet consecterum";

  it("should render a card correctly", () => {
    render(<CardFeatures iconURL={imageURL} iconAltText={altText} cardTitle={title} cardPara={paragraph} />);

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("should render a card with the provided icon and dimensions", () => {
    const imageWidth = 120;
    const imageHeight = 200;

    render(
      <CardFeatures
        iconURL={imageURL}
        iconAltText={altText}
        iconWidth={imageWidth}
        iconHeight={imageHeight}
        cardTitle={title}
        cardPara={paragraph}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("width", imageWidth);
    expect(screen.getByRole("img")).toHaveProperty("height", imageHeight);
  });

  it("should render a card with the provided title", () => {
    render(<CardFeatures iconURL={imageURL} iconAltText={altText} cardTitle={title} cardPara={paragraph} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should render a card with the provided paragraph", () => {
    render(<CardFeatures iconURL={imageURL} iconAltText={altText} cardTitle={title} cardPara={paragraph} />);

    expect(screen.getByText(paragraph)).toBeInTheDocument();
    expect(screen.getByText(paragraph)).toBeInTheDocument();
  });
});
