import SideMenu from "@/components/layouts/SideMenu";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

/**
 * User dashboard design.
 * Provides the common structure for all authenticated dashboard pages.
 * Verifies the user's session and displays a side menu with navigation options.
 * Redirect to login if the user is not authenticated.
 *
 * @component
 * @param children Content of nested dashboard pages
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
