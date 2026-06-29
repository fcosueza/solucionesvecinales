import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActionButton from ".";

jest.mock("@/components/layouts/Forms/FinanceAddForm", () => ({
  __esModule: true,
  default: ({ communityID, onClose }: { communityID: number; onClose: () => void }) => (
    <div>
      FinanceAddForm {communityID}
      <button onClick={onClose}>Close Finance</button>
    </div>
  )
}));

jest.mock("@/components/layouts/Forms/IncidentAddForm", () => ({
  __esModule: true,
  default: ({ communityID, onClose }: { communityID: number; onClose: () => void }) => (
    <div>
      IncidentAddForm {communityID}
      <button onClick={onClose}>Close Incident</button>
    </div>
  )
}));

describe("ActionButton component test suite", () => {
  it("should render the default text when buttonText is not provided", () => {
    render(<ActionButton modalType="finance" communityID={7} />);

    expect(screen.getByRole("button", { name: "+ añadir" })).toBeInTheDocument();
  });

  it("should not render the button when canOpen is false", () => {
    render(<ActionButton buttonText="+ add record" canOpen={false} modalType="finance" communityID={7} />);

    expect(screen.queryByRole("button", { name: "+ add record" })).not.toBeInTheDocument();
    expect(screen.queryByText("FinanceAddForm 7")).not.toBeInTheDocument();
    expect(screen.queryByText("IncidentAddForm 7")).not.toBeInTheDocument();
  });

  it("should open FinanceAddForm on click when modalType is finance", async () => {
    render(<ActionButton buttonText="+ add record" modalType="finance" communityID={7} />);

    await userEvent.click(screen.getByRole("button", { name: "+ add record" }));

    expect(screen.getByText("FinanceAddForm 7")).toBeInTheDocument();
    expect(screen.queryByText("IncidentAddForm 7")).not.toBeInTheDocument();
  });

  it("should open IncidentAddForm on click when modalType is incident", async () => {
    render(<ActionButton buttonText="+ add incidents" modalType="incident" communityID={12} />);

    await userEvent.click(screen.getByRole("button", { name: "+ add incidents" }));

    expect(screen.getByText("IncidentAddForm 12")).toBeInTheDocument();
    expect(screen.queryByText("FinanceAddForm 12")).not.toBeInTheDocument();
  });

  it("should close FinanceAddForm when onClose is called", async () => {
    render(<ActionButton buttonText="+ add record" modalType="finance" communityID={7} />);

    await userEvent.click(screen.getByRole("button", { name: "+ add record" }));
    expect(screen.getByText("FinanceAddForm 7")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Close Finance" }));
    expect(screen.queryByText("FinanceAddForm 7")).not.toBeInTheDocument();
  });

  it("should close IncidentAddForm when onClose is called", async () => {
    render(<ActionButton buttonText="+ add incidents" modalType="incident" communityID={12} />);

    await userEvent.click(screen.getByRole("button", { name: "+ add incidents" }));
    expect(screen.getByText("IncidentAddForm 12")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Close Incident" }));
    expect(screen.queryByText("IncidentAddForm 12")).not.toBeInTheDocument();
  });
});
