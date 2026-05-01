import { render, screen } from "@testing-library/react";
import { usePathname as rutaActualMock } from "next/navigation";
import SideMenu from ".";
import { UserRole } from "@/types";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn()
}));

describe("Suite de pruebas del componente SideMenu", () => {
  beforeEach(() => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities");
  });

  it("Debe renderizar la estructura principal y los datos del usuario", () => {
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
    expect(screen.getByRole("link", { name: "Perfil" })).toHaveAttribute("href", "/profile");
    expect(screen.getByRole("link", { name: "Salir" })).toHaveAttribute("href", "/logout");
    expect(screen.getByAltText("Logo de Soluciones Vecinales en blanco")).toBeInTheDocument();
  });

  it("Debe usar el avatar predeterminado cuando no se indica avatarUrl", () => {
    render(<SideMenu userName="Carlos" role={UserRole.admin} />);

    expect(screen.getByAltText("Avatar de Carlos")).toHaveAttribute(
      "src",
      expect.stringContaining("url=%2Fassets%2Fimages%2Fdefault-community.jpeg")
    );
  });

  it("Debe renderizar la etiqueta correcta para cada rol", () => {
    const { rerender } = render(<SideMenu userName="Andrea" role={UserRole.admin} />);
    expect(screen.getByText("Administrador")).toBeInTheDocument();

    rerender(<SideMenu userName="Andrea" role={UserRole.webAdmin} />);
    expect(screen.getByText("Administrador Web")).toBeInTheDocument();
  });

  it("Debe marcar como activo el enlace cuando la ruta coincide exactamente", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Mis comunidades" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Perfil" })).not.toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Salir" })).not.toHaveClass("menuLinkActive");
  });

  it("Debe marcar como activo un enlace distinto de logout cuando la ruta es hija", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/profile/settings");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Perfil" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Mis comunidades" })).not.toHaveClass("menuLinkActive");
  });

  it("No debe marcar como activo logout cuando la ruta es hija de logout", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/logout/confirm");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Salir" })).not.toHaveClass("menuLinkActive");
  });

  it("Debe mantener activa Vista General cuando la ruta es el detalle base de la comunidad", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Vista General" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Mis comunidades" })).not.toHaveClass("menuLinkActive");
  });

  it("Debe mantener activo el enlace padre de comunidad cuando la ruta es una subruta", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12/incidencias/44");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.getByRole("link", { name: "Incidencias" })).toHaveClass("menuLinkActive");
    expect(screen.getByRole("link", { name: "Vista General" })).not.toHaveClass("menuLinkActive");
  });

  it("No debe mostrar Solicitudes para un inquilino", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12");

    render(<SideMenu userName="Laura" role={UserRole.tenant} />);

    expect(screen.queryByRole("link", { name: "Solicitudes" })).not.toBeInTheDocument();
  });

  it("Debe mostrar Solicitudes para un administrador", () => {
    (rutaActualMock as jest.Mock).mockReturnValue("/communities/12");

    render(<SideMenu userName="Laura" role={UserRole.admin} />);

    expect(screen.getByRole("link", { name: "Solicitudes" })).toHaveAttribute("href", "/communities/12/solicitudes");
  });
});
