import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddZoneFormButton from ".";

// Mock componente AddZoneForm to keep the test focused on AddZoneFormButton behavior
jest.mock("@/components/layouts/Forms/AddZoneForm", () => ({
  __esModule: true,
  default: ({ communityID, onClose }: { communityID: number; onClose: () => void }) => (
    <div>
      AddZoneForm {communityID}
      <button onClick={onClose}>Close AddZoneForm</button>
    </div>
  )
}));

describe("AddZoneFormButton component test suite", () => {
  it("should render the add zone button", () => {
    render(<AddZoneFormButton communityID={9} />);

    expect(screen.getByRole("button", { name: "+ añadir zona" })).toBeInTheDocument();
    expect(screen.queryByText("AddZoneForm 9")).not.toBeInTheDocument();
  });

  it("should open AddZoneForm on button click", async () => {
    render(<AddZoneFormButton communityID={9} />);

    await userEvent.click(screen.getByRole("button", { name: "+ añadir zona" }));

    expect(screen.getByText("AddZoneForm 9")).toBeInTheDocument();
  });

  it("should close AddZoneForm when onClose is called", async () => {
    render(<AddZoneFormButton communityID={9} />);

    await userEvent.click(screen.getByRole("button", { name: "+ añadir zona" }));
    expect(screen.getByText("AddZoneForm 9")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Close AddZoneForm" }));
    expect(screen.queryByText("AddZoneForm 9")).not.toBeInTheDocument();
  });
});
