import ProfileForm from "@/components/layouts/Forms/ProfileForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const helpContent: HelpContent = {
  title: "Ayuda: Perfil",
  summary: "Gestiona tu información personal y datos de cuenta.",
  steps: [
    "Revisa tus datos actuales.",
    "Actualiza los campos que necesites modificar.",
    "Guarda los cambios desde el formulario.",
    "Verifica que los datos actualizados se muestren correctamente."
  ],
  constraints: [
    "Algunos campos pueden tener validaciones de formato.",
    "La imagen de perfil debe cumplir el formato permitido."
  ]
};

/**
 * Página de perfil del usuario.
 * Permite al usuario autenticado ver y editar su información personal, incluyendo
 * nombre, apellido, correo electrónico, contraseña e imagen de perfil.
 *
 * @component
 * @returns La página de perfil del usuario renderizada
 */
const ProfilePage = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const userID = sesionVerificada.session.userID;

  const usuario = await prisma.usuario.findUnique({
    where: { id: userID },
    select: {
      nombre: true,
      apellido: true,
      email: true,
      rol: true,
      imagen: true
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  const esAdministrador = usuario.rol === UserRole.admin || usuario.rol === UserRole.webAdmin;
  const tieneComunidades = esAdministrador ? (await prisma.comunidad.count({ where: { adminID: userID } })) > 0 : false;

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <h1 className={style.title}>Mi perfil</h1>
      <p className={style.description}>Cambiar los datos de tu perfil</p>
      <ProfileForm
        nombre={usuario.nombre}
        apellido={usuario.apellido}
        email={usuario.email}
        rol={usuario.rol as UserRole}
        imagen={usuario.imagen ?? undefined}
        tieneComunidades={tieneComunidades}
      />
    </main>
  );
};

export default ProfilePage;
