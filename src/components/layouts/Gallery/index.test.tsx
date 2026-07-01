import { render, screen } from "@testing-library/react";
import Gallery from ".";

describe("Gallery component test suite", () => {
  it("Should render the gallery component correctly", () => {
    render(
      <Gallery>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getByRole("gallery")).toBeInTheDocument();
  });

  it("Should render the elements passed as children", () => {
    render(
      <Gallery>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("Should render all elements passed as children", () => {
    render(
      <Gallery>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getAllByRole("heading")).toHaveLength(4);
  });

  it("Should render the gallery with the gallery CSS class applied", () => {
    render(
      <Gallery>
        <h1>Test</h1>
      </Gallery>
    );

    expect(screen.getByRole("gallery")).toHaveClass("gallery");
  });

  it("Should render the provided title", () => {
    const title = "Lorem Ipsum Title";

    render(
      <Gallery title={title}>
        <div>Test</div>
      </Gallery>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("Should not render the title if none is provided", () => {
    render(
      <Gallery>
        <div>Test</div>
      </Gallery>
    );

    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
