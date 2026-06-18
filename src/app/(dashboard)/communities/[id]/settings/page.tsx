import CommunitySettingsForm from "@/components/layouts/Forms/CommunitySettingsForm";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

const helpContent: HelpContent = {
  title: "Ayuda: Configuración",
  summary: "Actualiza datos y ajustes de la comunidad.",
  steps: [
    "Edita los campos de configuración necesarios.",
    "Revisa dirección y datos generales.",
    "Guarda los cambios desde el formulario.",
    "Confirma que la información se actualizó correctamente."
  ],
  constraints: [
    "Solo administradores autorizados pueden modificar esta página.",
    "Los datos deben cumplir las validaciones del formulario."
  ]
};

/**
 * Community configuration page.
 * Allows administrators to edit community data such as name, address, and description.
 *
 * @component
 * @param params Route parameters including community ID
 * @returns La community settings page rendered
 */
const CommunitySettingsPage = async ({ params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const communityID = Number(id);

  if (isNaN(communityID)) {
    notFound();
  }

  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdministrador) {
    redirect(`/communities/${communityID}/overview`);
  }

  const comunidad = await prisma.community.findUnique({
    where: { id: communityID },
    select: {
      id: true,
      name: true,
      street: true,
      number: true,
      city: true,
      province: true,
      country: true,
      adminId: true
    }
  });

  if (!comunidad) {
    notFound();
  }

  if (comunidad.adminId !== sesionVerificada.session.userID) {
    redirect(`/communities/${communityID}/overview`);
  }

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <h1 className={style.title}>Configuracion</h1>
      <p className={style.description}>Gestiona los datos y ajustes de la comunidad</p>
      <CommunitySettingsForm
        communityID={comunidad.id}
        nombre={comunidad.name}
        calle={comunidad.street}
        numero={comunidad.number}
        ciudad={comunidad.city}
        provincia={comunidad.province}
        pais={comunidad.country}
      />
    </main>
  );
};

export default CommunitySettingsPage;
