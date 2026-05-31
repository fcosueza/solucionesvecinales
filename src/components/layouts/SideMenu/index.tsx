"use client";

import Logo from "@/components/ui/Logo";
import { UserRole } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import style from "./style.module.css";

interface Props {
  userName: string;
  role: UserRole;
  avatarUrl?: string;
}

type MenuLink = {
  text: string;
  href: string;
};

/// Base links that are always displayed in the side menu, regardless of the active community or user role.
const enlacesBase = [
  { text: "Mis comunidades", href: "/communities" },
  { text: "Perfil de Usuario", href: "/profile" },
  { text: "Contacto", href: "/contacto" },
  { text: "Salir", href: "/logout" }
] as const;

const enlacesBackOffice = [
  { text: "Vista General", href: "/backoffice/overview" },
  { text: "Contacto", href: "/backoffice/contacto" },
  { text: "Comunidades", href: "/backoffice/comunidades" },
  { text: "Usuarios", href: "/backoffice/usuarios" },
  { text: "Incidencias", href: "/backoffice/incidencias" },
  { text: "Zonas Comunes", href: "/backoffice/zonas-comunes" },
  { text: "Finanzas", href: "/backoffice/finanzas" },
  { text: "Solicitudes", href: "/backoffice/solicitudes" },
  { text: "Salir", href: "/logout" }
] as const;

/**
 * Generates community-specific navigation links.
 *
 * @param id Community ID
 * @returns Array of objects with text and href of each community link
 */
const enlacesComunidad = (id: string) => [
  { text: "Vista General", href: `/communities/${id}/overview` },
  { text: "Incidencias", href: `/communities/${id}/incidencias` },
  { text: "Zonas Comunes", href: `/communities/${id}/zonas-comunes` },
  { text: "Finanzas", href: `/communities/${id}/finanzas` }
];

/**
 * Generate the link to the requests section of a community. Only visible to administrators.
 *
 * @param id Community ID
 * @returns Objeto with text and href of the requests link
 */
const enlaceSolicitudes = (id: string) => ({ text: "Solicitudes", href: `/communities/${id}/requests` });

/**
 * Generates the link to the configuration section of a community. Only visible to administrators.
 *
 * @param id Community ID
 * @returns Objeto with text and href of settings link
 */
const enlaceConfiguracion = (id: string) => ({ text: "Configuracion", href: `/communities/${id}/settings` });

/** Mapping user roles to readable labels in Spanish to display in the interface. */
const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

/**
 * Determines if a user has an administrator role (admin or webAdmin).
 *
 * @param role The user role
 * @returns true if the user is admin or webAdmin
 */
const isAdmin = (role: UserRole) => role === UserRole.admin || role === UserRole.webAdmin;

/**
 * Determines if the current route belongs to the backoffice.
 *
 * @param rutaActual The current route of the browser
 * @returns true if the path is "/backoffice" or starts with "/backoffice/"
 */
const isBackOfficeRoute = (rutaActual: string) => rutaActual === "/backoffice" || rutaActual.startsWith("/backoffice/");

/**
 * Function that determines the active route to highlight the appropriate option in the side menu
 *
 * @param rutaActual  The current path obtained from the usePathname hook, which represents the URL the user is on.
 * @param href The href of the link being evaluated to determine if it is the active route.
 * @param comundiadId The community ID extracted from the route, used to evaluate links related to the community.
 * @param bloquearDescendientes An optional boolean that, if true, prevents descendant routes from being considered active
 *
 * @returns  Un boolean indicating whether the link should be considered active (true) or not (false)
 */
const esRutaActiva = ({
  rutaActual,
  href,
  comunidadId,
  bloquearDescendientes = false
}: {
  rutaActual: string;
  href: string;
  comunidadId: string | null;
  bloquearDescendientes?: boolean;
}) => {
  // Checks if the current path exactly matches the link href.
  if (rutaActual === href) {
    return true;
  }
  // If blocking descendants is indicated, routes starting with the href followed by a slash are not considered.
  if (href === "/logout" || bloquearDescendientes) {
    return false;
  }

  // For community links, they are considered active if the current route is the root of the community or any subpaths within that community.
  if (href === `/communities/${comunidadId}/overview` && comunidadId) {
    return rutaActual === `/communities/${comunidadId}` || rutaActual.startsWith(`${href}/`);
  }

  if (href === "/backoffice/overview") {
    return rutaActual === "/backoffice" || rutaActual.startsWith(`${href}/`);
  }

  return rutaActual.startsWith(`${href}/`);
};

/**
 * Component that represents the application's side menu, displaying user information and navigation links.
 *
 * @param userName The name of the user to be displayed in the side menu.
 * @param role The user's role, used to determine which links to display.
 * @param avatarUrl The URL of the user's avatar, with a default value if not provided.
 *
 * @returns Un React node that represents the side menu.
 */
const SideMenu = ({ userName, role, avatarUrl = "/assets/images/default-community.jpeg" }: Props): React.ReactNode => {
  const rutaActual = usePathname();
  const matchComunidad = rutaActual.match(/^\/communities\/(\d+)/);
  const comunidadIdEnRuta = matchComunidad ? matchComunidad[1] : null;
  const mostrarBackOffice = role === UserRole.webAdmin && isBackOfficeRoute(rutaActual);

  const [comunidadId, setComunidadId] = useState<string | null>(null);

  useEffect(() => {
    if (mostrarBackOffice) {
      setComunidadId(null);
      return;
    }

    // If the current path is "/logout", the communityId state is cleared
    if (rutaActual.startsWith("/logout")) {
      setComunidadId(null);
      return;
    }

    // If a community ID is found in the route, the status is updated to reflect the active community
    if (comunidadIdEnRuta) {
      setComunidadId(comunidadIdEnRuta);
      return;
    }

    setComunidadId(null);
  }, [mostrarBackOffice, rutaActual, comunidadIdEnRuta]);

  // Active links are generated for the current community, including additional options for administrators if applicable.
  const enlacesActivosComunidad = comunidadId
    ? [
        ...enlacesComunidad(comunidadId),
        ...(isAdmin(role) ? [enlaceSolicitudes(comunidadId), enlaceConfiguracion(comunidadId)] : [])
      ]
    : [];
  const enlacesPrincipal: readonly MenuLink[] = mostrarBackOffice ? enlacesBackOffice : enlacesBase;

  return (
    <aside className={style.sidebar} aria-label="Menú lateral principal">
      <div className={style.menuTop}>
        <section className={style.profileSection}>
          <Image
            src={avatarUrl}
            alt={`Avatar de ${userName}`}
            width={72}
            height={72}
            className={style.avatar}
            priority
          />

          <div className={style.userData}>
            <p className={style.userName}>{userName}</p>
            <p className={style.userRole}>{etiquetasRol[role]}</p>
          </div>
        </section>

        <nav aria-label="Opciones del dashboard">
          <div
            className={`${style.comunidadMenu} ${comunidadId && !mostrarBackOffice ? style.comunidadMenuVisible : ""}`.trim()}
          >
            <ul className={style.menuList} aria-label="Opciones de la comunidad">
              {enlacesActivosComunidad.map(enlace => {
                const enlaceActivo = esRutaActiva({
                  rutaActual,
                  href: enlace.href,
                  comunidadId
                });

                return (
                  <li key={enlace.href}>
                    <Link
                      className={`${style.menuLink} ${enlaceActivo ? style.menuLinkActive : ""}`.trim()}
                      href={enlace.href}
                    >
                      {enlace.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <hr className={style.menuDivider} aria-hidden="true" />
          </div>
          <ul className={style.menuList}>
            {enlacesPrincipal.map(enlace => {
              const enlaceActivo = esRutaActiva({
                rutaActual,
                href: enlace.href,
                comunidadId,
                bloquearDescendientes:
                  mostrarBackOffice && enlace.href === "/logout"
                    ? true
                    : Boolean(comunidadId && enlace.href === "/communities")
              });

              return (
                <li key={enlace.href}>
                  <Link
                    className={`${style.menuLink} ${enlaceActivo ? style.menuLinkActive : ""}`.trim()}
                    href={enlace.href}
                  >
                    {enlace.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={style.menuBottom}>
        <Logo
          url="/assets/images/logo-white.svg"
          altText="Logo de Soluciones Vecinales en blanco"
          width={180}
          height={90}
        />
      </div>
    </aside>
  );
};

export default SideMenu;
