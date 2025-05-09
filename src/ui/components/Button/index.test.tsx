import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Button component test...", () => {
  const handleMock = jest.fn();
  const text = "prueba";

  it("Should render a button properly", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should render a button with the specified text", () => {
    render(<Button text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Should render a button enabled by default", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
  });

  it("Should render a button disabled if specified", () => {
    render(<Button text={text} disabled={true} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);
  });

  it("Should render a button with the default type", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("Should render a button with the specified type", () => {
    const type = "reset";

    render(<Button text={text} type={type} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should call specified function when clicked", async () => {
    render(<Button text={text} onClick={handleMock} />);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toHaveBeenCalled());
  });
});
