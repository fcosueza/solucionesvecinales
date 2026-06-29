import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Button component test suite", () => {
  const handlerMock = jest.fn();
  const text = "test";

  it("should render a button correctly", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render a button with the provided text", () => {
    render(<Button text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should render an enabled button by default", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
  });

  it("should render a disabled button when specified", () => {
    render(<Button text={text} disabled={true} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);
  });

  it("should render a button with the default type", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("should render a button with the provided type", () => {
    const type = "reset";

    render(<Button text={text} type={type} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should execute the provided function on click", async () => {
    render(<Button text={text} onClick={handlerMock} />);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handlerMock).toHaveBeenCalled());
  });
});
