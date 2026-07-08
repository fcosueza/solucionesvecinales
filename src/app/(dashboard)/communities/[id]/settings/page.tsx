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
 *
 * Allows administrators to edit community data such as name, address, and description.
 *
 * @param params Route parameters including community ID
 * @returns The community settings page rendered
 */
const CommunitySettingsPage = async ({ params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const communityID = Number(id);

  if (isNaN(communityID)) {
    notFound();
  }

  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    redirect(`/communities/${communityID}/overview`);
  }

  const community = await prisma.community.findUnique({
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

  if (!community) {
    notFound();
  }

  if (community.adminId !== verifiedSession.session.userID) {
    redirect(`/communities/${communityID}/overview`);
  }

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <h1 className={style.title}>Configuracion</h1>
      <p className={style.description}>Gestiona los datos y ajustes de la comunidad</p>
      <CommunitySettingsForm
        communityID={community.id}
        name={community.name}
        street={community.street}
        number={community.number}
        city={community.city}
        province={community.province}
        country={community.country}
      />
    </main>
  );
};

export default CommunitySettingsPage;
