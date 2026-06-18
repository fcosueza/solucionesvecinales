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
 * User profile page.
 * Allows the authenticated user to view and edit their personal information, including
 * first name, last name, email, password and profile image.
 *
 * @component
 * @returns La rendered user profile page
 */
const ProfilePage = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const userID = sesionVerificada.session.userID;

  const usuario = await prisma.user.findUnique({
    where: { id: userID },
    select: {
      name: true,
      lastName: true,
      email: true,
      role: true,
      image: true
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  const esAdministrador = usuario.role === UserRole.admin || usuario.role === UserRole.webAdmin;
  const tieneComunidades = esAdministrador ? (await prisma.community.count({ where: { adminId: userID } })) > 0 : false;

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <h1 className={style.title}>Mi perfil</h1>
      <p className={style.description}>Cambiar los datos de tu perfil</p>
      <ProfileForm
        nombre={usuario.name}
        apellido={usuario.lastName}
        email={usuario.email}
        rol={usuario.role as UserRole}
        imagen={usuario.image ?? undefined}
        tieneComunidades={tieneComunidades}
      />
    </main>
  );
};

export default ProfilePage;
