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

describe("CTA component test suite", () => {
  const title = "Test CTA Title";
  const para = "Lorem ipsum dolor site amet consecterum";
  const buttonText = "TestButton";

  it("Should render the CTA title properly", () => {
    render(<CTA title={title} para={para} buttonText={buttonText} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("Should render the CTA paragraph properly", () => {
    render(<CTA title={title} para={para} buttonText={buttonText} />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
    expect(screen.getByText(para)).toBeInTheDocument();
  });

  it("Should render the CTA button correctly", () => {
    render(<CTA title={title} para={para} buttonText={buttonText} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("Should not call router hook when the button is not clicked", async () => {
    const router = useRouter();

    render(<CTA title={title} para={para} buttonText={buttonText} />);

    await waitFor(() => expect(router.push).not.toHaveBeenCalled());
  });

  it("Should call router hook when the button is clicked", async () => {
    const router = useRouter();

    render(<CTA title={title} para={para} buttonText={buttonText} />);

    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(router.push).toHaveBeenCalled());
  });
});
