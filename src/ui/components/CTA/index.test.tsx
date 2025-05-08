import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import CTA from ".";

// Mock useRouter module
jest.mock("next/navigation");

// Adding method push to our useRouter mock
(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn()
});

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
  it("It must not call router hook when the button is not clicked", async () => {
    const router = useRouter();

    render(<CTA title={title} para={para} buttonText={buttonText} />);

    userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(router.push).not.toHaveBeenCalled());
  });

  it("It must call router hook when the button is clicked", async () => {
    const router = useRouter();

    render(<CTA title={title} para={para} buttonText={buttonText} />);

    userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(router.push).toHaveBeenCalled());
  });
});
