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

/// Enlaces base que siempre se muestran en el menú lateral, independientemente de la comunidad activa o el rol del usuario.
const enlacesBase = [
  { text: "Mis comunidades", href: "/communities" },
  { text: "Perfil", href: "/profile" },
  { text: "Salir", href: "/logout" }
] as const;

// Función que genera los enlaces específicos de una comunidad, incluyendo opciones adicionales para administradores.
const enlacesComunidad = (id: string) => [
  { text: "Vista General", href: `/communities/${id}/overview` },
  { text: "Incidencias", href: `/communities/${id}/incidencias` },
  { text: "Zonas Comunes", href: `/communities/${id}/zonas-comunes` },
  { text: "Finanzas", href: `/communities/${id}/finanzas` }
];

// Función que genera el enlace a la sección de solicitudes, visible solo para administradores.
const enlaceSolicitudes = (id: string) => ({ text: "Solicitudes", href: `/communities/${id}/solicitudes` });

// Mapeo de roles a etiquetas legibles para mostrar en la interfaz.
const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

// Función que determina si un usuario tiene rol de administrador (admin o webAdmin).
const isAdmin = (role: UserRole) => role === UserRole.admin || role === UserRole.webAdmin;

/**
 * Función que determina la ruta activa para resaltar la opción adecuada en el menu lateral
 *
 * @param rutaActual  La ruta actual obtenida del hook usePathname, que representa la URL en la que se encuentra el usuario.
 * @param href El href del enlace que se está evaluando para determinar si es la ruta activa.
 * @param comundiadId El ID de la comunidad extraído de la ruta, utilizado para evaluar enlaces relacionados con la comunidad.
 * @param bloquearDescendientes Un booleano opcional que, si es true, evita que se consideren rutas descendientes como activas
 *
 * @returns  Un booleano que indica si el enlace debe ser considerado activo (true) o no (false)
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
  // Verifica si la ruta actual coincide exactamente con el href del enlace.
  if (rutaActual === href) {
    return true;
  }
  // Si se indica bloquear descendientes, no se consideran rutas que empiecen con el href seguido de una barra.
  if (href === "/logout" || bloquearDescendientes) {
    return false;
  }

  // Para enlaces de comunidad, se consideran activos si la ruta actual es la raíz de la comunidad o cualquier subruta dentro de esa comunidad.
  if (href === `/communities/${comunidadId}/overview` && comunidadId) {
    return rutaActual === `/communities/${comunidadId}` || rutaActual.startsWith(`${href}/`);
  }

  return rutaActual.startsWith(`${href}/`);
};

/**
 * Componente que representa el menú lateral de la aplicación, mostrando información del usuario y enlaces de navegación.
 *
 * @param userName El nombre del usuario que se mostrará en el menú lateral.
 * @param role El rol del usuario, utilizado para determinar qué enlaces mostrar.
 * @param avatarUrl La URL del avatar del usuario, con un valor por defecto si no se proporciona.
 *
 * @returns Un nodo de React que representa el menú lateral.
 */
const SideMenu = ({ userName, role, avatarUrl = "/assets/images/default-community.jpeg" }: Props): React.ReactNode => {
  const rutaActual = usePathname();
  const matchComunidad = rutaActual.match(/^\/communities\/(\d+)/);
  const comunidadIdEnRuta = matchComunidad ? matchComunidad[1] : null;

  const [comunidadId, setComunidadId] = useState<string | null>(null);

  useEffect(() => {
    // Si la ruta actual es "/logout", se limpia el estado de comunidadId
    if (rutaActual.startsWith("/logout")) {
      setComunidadId(null);
      return;
    }

    // Si se encuentra un ID de comunidad en la ruta, se actualiza el estado para reflejar la comunidad activa
    if (comunidadIdEnRuta) {
      setComunidadId(comunidadIdEnRuta);
    }
  }, [rutaActual, comunidadIdEnRuta]);

  // Se generan los enlaces activos para la comunidad actual, incluyendo opciones adicionales para administradores si corresponde.
  const enlacesActivosComunidad = comunidadId
    ? [...enlacesComunidad(comunidadId), ...(isAdmin(role) ? [enlaceSolicitudes(comunidadId)] : [])]
    : [];

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
          <div className={`${style.comunidadMenu} ${comunidadId ? style.comunidadMenuVisible : ""}`.trim()}>
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
            {enlacesBase.map(enlace => {
              const enlaceActivo = esRutaActiva({
                rutaActual,
                href: enlace.href,
                comunidadId,
                bloquearDescendientes: Boolean(comunidadId && enlace.href === "/communities")
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
