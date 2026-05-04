import SideMenu from "@/components/layouts/SideMenu";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

/**
 * Diseño del dashboard de usuario.
 * Proporciona la estructura común a todas las páginas del dashboard autenticado.
 * Verifica la sesión del usuario y muestra un menú lateral con opciones de navegación.
 * Redirige a login si el usuario no está autenticado.
 *
 * @component
 * @param children Contenido de las páginas anidadas del dashboard
 * @returns El layout del dashboard renderizado
 */
export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: sesionVerificada.session.userID
    },
    select: {
      nombre: true,
      apellido: true,
      rol: true,
      imagen: true
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  return (
    <div className={style.layoutWrapper}>
      <SideMenu
        userName={`${usuario.nombre} ${usuario.apellido}`}
        role={usuario.rol as UserRole}
        avatarUrl={usuario.imagen ?? undefined}
      />
      <div className={style.contentArea}>{children}</div>
    </div>
  );
}
