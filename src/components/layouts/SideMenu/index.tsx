"use client";

import Logo from "@/components/ui/Logo";
import { UserRole } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./style.module.css";

interface Props {
  userName: string;
  role: UserRole;
  avatarUrl?: string;
}

const enlacesBase = [
  { text: "Mis comunidades", href: "/overview" },
  { text: "Perfil", href: "/profile" },
  { text: "Salir", href: "/logout" }
] as const;

const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

const SideMenu = ({ userName, role, avatarUrl = "/assets/images/default-community.jpeg" }: Props): React.ReactNode => {
  const rutaActual = usePathname();

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
          <ul className={style.menuList}>
            {enlacesBase.map(enlace => {
              const enlaceActivo =
                rutaActual === enlace.href || (enlace.href !== "/logout" && rutaActual.startsWith(`${enlace.href}/`));

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
