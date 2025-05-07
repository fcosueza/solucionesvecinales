import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CTA from ".";

describe("Tests del componente CTA", () => {
  const title = "Test CTA Title";
  const para = "Lorem ipsum dolor site amet consecterum";
  const buttonText = "TestButton";

  it("Debe renderizar correctamente el titulo del CTA", () => {
    render(<CTA title={title} para={para} buttonText={buttonText} />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("Debe renderizar correctamente el parrafo del CTA", () => {
    render(<CTA title={title} para={para} buttonText={buttonText} />);
    expect(screen.getByRole("paragraph")).toBeInTheDocument();
    expect(screen.getByText(para)).toBeInTheDocument();
  });

  it("Debe renderizar correctamente el botón del CTA", () => {
    render(<CTA title={title} para={para} buttonText={buttonText} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
