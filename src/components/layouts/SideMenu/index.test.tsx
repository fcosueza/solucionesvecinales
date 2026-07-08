import { render, screen } from "@testing-library/react";
import { usePathname as rutaActualMock } from "next/navigation";
import SideMenu from ".";
import { UserRole } from "@/types";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn()
}));

describe("SideMenu component test suite", () => {
  beforeEach(() => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities");
  });

  it("Should render the main structure and user data", () => {
    render(<SideMenu userName="Marina" role={UserRole.tenant} avatarUrl="/assets/images/avatar.jpg" />);

    expect(screen.getByLabelText("Menú lateral principal")).toBeInTheDocument();
    expect(screen.getByText("Marina")).toBeInTheDocument();
    expect(screen.getByText("Inquilino")).toBeInTheDocument();
    expect(screen.getByAltText("Avatar de Marina")).toHaveAttribute(
      "src",
      expect.stringContaining("url=%2Fassets%2Fimages%2Favatar.jpg")
    );
    expect(screen.getByRole("navigation", { name: "Opciones del dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mis comunidades" })).toHaveAttribute("href", "/communities");
    expect(screen.getByRole("link", { name: "Perfil de Usuario" })).toHaveAttribute("href", "/profile");
    expect(screen.getByRole("link", { name: "Salir" })).toHaveAttribute("href", "/logout");
    expect(screen.getByAltText("Logo de Soluciones Vecinales en blanco")).toBeInTheDocument();
  });

  it("Should use the default avatar when avatarUrl is not provided", () => {
    render(<SideMenu userName="Carlos" role={UserRole.admin} />);

    expect(screen.getByAltText("Avatar de Carlos")).toHaveAttribute(
      "src",
      expect.stringContaining("url=%2Fassets%2Fimages%2Fdefault-community.jpeg")
    );
  });

  it("Should render the correct label for each role", () => {
    const { rerender } = render(<SideMenu userName="Andrea" role={UserRole.admin} />);
    expect(screen.getByText("Administrador")).toBeInTheDocument();

    rerender(<SideMenu userName="Andrea" role={UserRole.webAdmin} />);
    expect(screen.getByText("Administrador Web")).toBeInTheDocument();
  });

  it("Should mark a link as active when the route matches exactly", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Mis comunidades" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Perfil de Usuario" })).not.toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Salir" })).not.toHaveClass("menuLinkActive");
  });

  it("Should mark a non-logout link as active when the route is a child route", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/profile/settings");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Perfil de Usuario" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Mis comunidades" })).not.toHaveClass("menuLinkActive");
  });

  it("Should not mark logout as active when the route is a child of logout", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/logout/confirm");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Salir" })).not.toHaveClass("menuLinkActive");
  });

  it("Should keep Vista General active when the route is the community base detail", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Vista General" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Mis comunidades" })).not.toHaveClass("menuLinkActive");
  });

  it("Should keep the community parent link active when the route is a subroute", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12/incidents/44");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Incidents" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Vista General" })).not.toHaveClass("menuLinkActive");
  });

  it("Should not show Solicitudes for a tenant", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.queryByRole("link", { name: "Solicitudes" })).not.toBeInTheDocument();
  });

  it("Should show Solicitudes for an admin", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12");

    render(<SideMenu userName="Laura" role={UserRole.admin} />);

    expect(screen.getByRole("link", { name: "Common Areas" })).toHaveAttribute("href", "/communities/12/common-areas");
    expect(screen.getByRole("link", { name: "Finanzas" })).toHaveAttribute("href", "/communities/12/finances");
    expect(screen.getByRole("link", { name: "Solicitudes" })).toHaveAttribute("href", "/communities/12/requests");
  });

  it("Should show the back-office menu for a web admin", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/backoffice/overview");

    render(<SideMenu userName="Laura" role={UserRole.webAdmin} />);

    expect(screen.getByRole("link", { name: "Vista General" })).toHaveAttribute("href", "/backoffice/overview");
    expect(screen.getByRole("link", { name: "Comunidades" })).toHaveAttribute("href", "/backoffice/comunidades");
    expect(screen.getByRole("link", { name: "Usuarios" })).toHaveAttribute("href", "/backoffice/usuarios");
    expect(screen.getByRole("link", { name: "Incidencias" })).toHaveAttribute("href", "/backoffice/incidencias");
    expect(screen.getByRole("link", { name: "Zonas Comunes" })).toHaveAttribute("href", "/backoffice/zonas-comunes");
    expect(screen.getByRole("link", { name: "Finanzas" })).toHaveAttribute("href", "/backoffice/finanzas");
    expect(screen.getByRole("link", { name: "Solicitudes" })).toHaveAttribute("href", "/backoffice/solicitudes");
    expect(screen.queryByRole("link", { name: "Mis comunidades" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Perfil de Usuario" })).not.toBeInTheDocument();
  });

  it("Should keep Vista General active at the back-office root", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/backoffice");

    render(<SideMenu userName="Laura" role={UserRole.webAdmin} />);

    expect(screen.getByRole("link", { name: "Vista General" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Comunidades" })).not.toHaveClass("menuLinkActive");
  });

  it("Should keep Vista General active on a back-office overview subroute", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/backoffice/overview/metricas");

    render(<SideMenu userName="Laura" role={UserRole.webAdmin} />);

    expect(screen.getByRole("link", { name: "Vista General" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Comunidades" })).not.toHaveClass("menuLinkActive");
  });

  it("Should hide community links when returning to Mis comunidades", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12/overview");

    const { rerender } = render(<SideMenu userName="Laura" role={UserRole.admin} />);

    expect(screen.getByRole("link", { name: "Vista General" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Solicitudes" })).toBeInTheDocument();

    (rutaActualMock as jest.Mock).mockReturnValue("/communities");
    rerender(<SideMenu userName="Laura" role={UserRole.admin} />);

    expect(screen.queryByRole("link", { name: "Vista General" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Solicitudes" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mis comunidades" })).toHaveClass("menuLinkActive");
  });
});
