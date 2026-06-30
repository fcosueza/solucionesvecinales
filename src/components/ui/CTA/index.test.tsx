import { render, screen, waitFor } from "@testing-library/react";
import { useRouter as mockRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import CTA from ".";

// Mocks the useRouter module.
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Adds the push method to the useRouter mock.
(mockRouter as jest.Mock).mockReturnValue({
  push: jest.fn()
});

describe("CTA component test suite", () => {
  const title = "Test CTA Title";
  const paragraph = "Lorem ipsum dolor site amet consecterum";
  const buttonText = "TestButton";

  it("should render the CTA title correctly", () => {
    render(<CTA title={title} para={paragraph} buttonText={buttonText} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should render the CTA paragraph correctly", () => {
    render(<CTA title={title} para={paragraph} buttonText={buttonText} />);

    expect(screen.getByText(paragraph)).toBeInTheDocument();
    expect(screen.getByText(paragraph)).toBeInTheDocument();
  });

  it("should render the CTA button correctly", () => {
    render(<CTA title={title} para={paragraph} buttonText={buttonText} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should highlight the matching title fragment when highlightText matches", () => {
    const highlightedTitle = "Tu comunidad conectada y organizada";
    const highlightedText = "conectada";

    render(<CTA title={highlightedTitle} highlightText={highlightedText} para={paragraph} buttonText={buttonText} />);

    const heading = screen.getByRole("heading", { level: 1 });
    const highlightedElement = screen.getByText(highlightedText);

    expect(heading).toHaveTextContent(highlightedTitle);
    expect(highlightedElement.tagName).toBe("SPAN");
  });

  it("should not call the router if the button is not clicked", async () => {
    const router = mockRouter();

    render(<CTA title={title} para={paragraph} buttonText={buttonText} />);

    await waitFor(() => expect(router.push).not.toHaveBeenCalled());
  });

  it("should call the router when the button is clicked", async () => {
    const router = mockRouter();

    render(<CTA title={title} para={paragraph} buttonText={buttonText} />);

    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(router.push).toHaveBeenCalled());
  });
});
