import { render, screen } from "@testing-library/react";
import CardStat from ".";

describe("CardStat component test suite", () => {
  const title = "Incidentes Reportados";
  const value = "15";
  const description = "Número de incidentes reportados en el último mes";

  it("should render the component correctly", () => {
    render(<CardStat title={title} value={value} description={description} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the provided title", () => {
    render(<CardStat title={title} value={value} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should render the provided value", () => {
    render(<CardStat title={title} value={value} description={description} />);

    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("should render the provided description", () => {
    render(<CardStat title={title} value={value} description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should render the three text elements in the correct order", () => {
    render(<CardStat title={title} value={value} description={description} />);

    const parrafos = screen.getAllByRole("article")[0].querySelectorAll("p");

    expect(parrafos).toHaveLength(3);
    expect(parrafos[0]).toHaveTextContent(title);
    expect(parrafos[1]).toHaveTextContent(value);
    expect(parrafos[2]).toHaveTextContent(description);
  });
});
