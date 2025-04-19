import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Tests del componente Card...", () => {
  const imageURL = "/assets/image/doc.svg";
  const altText = "Imagen de unos documentos";
  const title = "Lorem Ipsum Dolor";
  const para = "Lorem Ipsum Dolor sit atmet consecterum";

  it("Debe renderizar un elemento de tipo Card", () => {
    render(<Card imageURL={imageURL} imageAltText={altText} cardTitle={title} cardPara={para} />);

    expect(screen.getByRole("card")).toBeInTheDocument();
  });

  it("Debe renderizar un elemento de tipo Card con la imagen que hemos especificado", () => {
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

  it("Debe renderizar un elemento de tipo Card con el titulo especificado", () => {
    render(<Card imageURL={imageURL} imageAltText={altText} cardTitle={title} cardPara={para} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("Debe renderizar un elemento de tipo Card con el párrafo especificado", () => {
    render(<Card imageURL={imageURL} imageAltText={altText} cardTitle={title} cardPara={para} />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
    expect(screen.getByText(para)).toBeInTheDocument();
  });
});
