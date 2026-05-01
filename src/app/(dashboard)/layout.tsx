import Breadcrumb from "@/components/layouts/Breadcrumb";
import SideMenu from "@/components/layouts/SideMenu";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

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
      rol: true
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  return (
    <div className={style.layoutWrapper}>
      <SideMenu userName={`${usuario.nombre} ${usuario.apellido}`} role={usuario.rol as UserRole} />
      <div className={style.contentArea}>
        <Breadcrumb />
        {children}
      </div>
    </div>
  );
}
