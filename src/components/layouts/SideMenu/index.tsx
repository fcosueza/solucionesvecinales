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

const enlacesBase = [
  { text: "Mis comunidades", href: "/communities" },
  { text: "Perfil", href: "/profile" },
  { text: "Salir", href: "/logout" }
] as const;

const enlacesComunidad = (id: string) => [
  { text: "Vista General", href: `/communities/${id}/overview` },
  { text: "Incidencias", href: `/communities/${id}/incidencias` },
  { text: "Zonas Comunes", href: `/communities/${id}/zonas-comunes` },
  { text: "Finanzas", href: `/communities/${id}/finanzas` }
];

const enlaceSolicitudes = (id: string) => ({ text: "Solicitudes", href: `/communities/${id}/solicitudes` });

const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

const isAdmin = (role: UserRole) => role === UserRole.admin || role === UserRole.webAdmin;

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
  if (rutaActual === href) {
    return true;
  }

  if (href === "/logout" || bloquearDescendientes) {
    return false;
  }

  if (href === `/communities/${comunidadId}/overview` && comunidadId) {
    return rutaActual === `/communities/${comunidadId}` || rutaActual.startsWith(`${href}/`);
  }

  return rutaActual.startsWith(`${href}/`);
};

const SideMenu = ({ userName, role, avatarUrl = "/assets/images/default-community.jpeg" }: Props): React.ReactNode => {
  const rutaActual = usePathname();
  const matchComunidad = rutaActual.match(/^\/communities\/(\d+)/);
  const comunidadIdEnRuta = matchComunidad ? matchComunidad[1] : null;

  const [comunidadId, setComunidadId] = useState<string | null>(null);

  useEffect(() => {
    if (rutaActual.startsWith("/logout")) {
      setComunidadId(null);
      return;
    }

    if (comunidadIdEnRuta) {
      setComunidadId(comunidadIdEnRuta);
    }
    // When navigating away from a community route, keep the current state
  }, [rutaActual, comunidadIdEnRuta]);

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
