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

describe("Suite de pruebas del componente OverviewActions", () => {
  beforeEach(() => {
    (enrutadorMock as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
  });

  it("Debe renderizar el botón 'Buscar comunidad' para cualquier rol", () => {
    render(<OverviewActions role={UserRole.tenant} />);

    expect(screen.getByRole("button", { name: "Buscar comunidad" })).toBeInTheDocument();
  });

  it("Debe renderizar el botón 'Añadir comunidad' para el rol admin", () => {
    render(<OverviewActions role={UserRole.admin} />);

    expect(screen.getByRole("button", { name: "Añadir comunidad" })).toBeInTheDocument();
  });

  it("Debe renderizar el botón 'Añadir comunidad' para el rol webAdmin", () => {
    render(<OverviewActions role={UserRole.webAdmin} />);

    expect(screen.getByRole("button", { name: "Añadir comunidad" })).toBeInTheDocument();
  });

  it("No debe renderizar el botón 'Añadir comunidad' para el rol inquilino", () => {
    render(<OverviewActions role={UserRole.tenant} />);

    expect(screen.queryByRole("button", { name: "Añadir comunidad" })).not.toBeInTheDocument();
  });

  it("Debe navegar a /communities/search al hacer clic en 'Buscar comunidad'", async () => {
    render(<OverviewActions role={UserRole.tenant} />);

    await userEvent.click(screen.getByRole("button", { name: "Buscar comunidad" }));

    expect(pushMock).toHaveBeenCalledWith("/communities/search");
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  it("Debe navegar a /communities/add al hacer clic en 'Añadir comunidad'", async () => {
    render(<OverviewActions role={UserRole.admin} />);

    await userEvent.click(screen.getByRole("button", { name: "Añadir comunidad" }));

    expect(pushMock).toHaveBeenCalledWith("/communities/add");
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});
