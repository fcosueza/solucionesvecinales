import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter as enrutadorMock } from "next/navigation";
import OverviewActions from ".";
import { UserRole } from "@/types";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

describe("OverviewActions component test suite", () => {
  beforeEach(() => {
    (enrutadorMock as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
  });

  it("Should render the 'Buscar comunidad' button for any role", () => {
    render(<OverviewActions role={UserRole.tenant} />);

    expect(screen.getByRole("button", { name: "Buscar comunidad" })).toBeInTheDocument();
  });

  it("Should render the 'Añadir comunidad' button for the admin role", () => {
    render(<OverviewActions role={UserRole.admin} />);

    expect(screen.getByRole("button", { name: "Añadir comunidad" })).toBeInTheDocument();
  });

  it("Should render the 'Añadir comunidad' button for the webAdmin role", () => {
    render(<OverviewActions role={UserRole.webAdmin} />);

    expect(screen.getByRole("button", { name: "Añadir comunidad" })).toBeInTheDocument();
  });

  it("Should not render the 'Añadir comunidad' button for the tenant role", () => {
    render(<OverviewActions role={UserRole.tenant} />);

    expect(screen.queryByRole("button", { name: "Añadir comunidad" })).not.toBeInTheDocument();
  });

  it("Should navigate to /communities/search when clicking 'Buscar comunidad'", async () => {
    render(<OverviewActions role={UserRole.tenant} />);

    await userEvent.click(screen.getByRole("button", { name: "Buscar comunidad" }));

    expect(pushMock).toHaveBeenCalledWith("/communities/search");
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  it("Should navigate to /communities/add when clicking 'Añadir comunidad'", async () => {
    render(<OverviewActions role={UserRole.admin} />);

    await userEvent.click(screen.getByRole("button", { name: "Añadir comunidad" }));

    expect(pushMock).toHaveBeenCalledWith("/communities/add");
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});
