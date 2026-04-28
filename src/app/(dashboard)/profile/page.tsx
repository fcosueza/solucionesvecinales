import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

const ProfilePage = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: sesionVerificada.session.userID },
    select: {
      nombre: true,
      apellido: true,
      email: true,
      rol: true
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  return (
    <main className={style.main}>
      <section className={style.card}>
        <h1 className={style.title}>Perfil</h1>
        <p className={style.item}>
          <span className={style.label}>Nombre:</span> {usuario.nombre} {usuario.apellido}
        </p>
        <p className={style.item}>
          <span className={style.label}>Email:</span> {usuario.email}
        </p>
        <p className={style.item}>
          <span className={style.label}>Rol:</span> {etiquetasRol[usuario.rol as UserRole]}
        </p>
      </section>
    </main>
  );
};

export default ProfilePage;
