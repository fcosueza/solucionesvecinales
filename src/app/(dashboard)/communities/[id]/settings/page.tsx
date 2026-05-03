import CommunitySettingsForm from "@/components/layouts/Forms/CommunitySettingsForm";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

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

  const comunidad = await prisma.comunidad.findUnique({
    where: { id: communityID },
    select: {
      id: true,
      nombre: true,
      calle: true,
      numero: true,
      ciudad: true,
      provincia: true,
      pais: true,
      adminID: true
    }
  });

  if (!comunidad) {
    notFound();
  }

  if (comunidad.adminID !== sesionVerificada.session.userID) {
    redirect(`/communities/${communityID}/overview`);
  }

  return (
    <main className={style.main}>
      <h1 className={style.title}>Configuracion</h1>
      <p className={style.description}>Gestiona los datos y ajustes de la comunidad</p>
      <CommunitySettingsForm
        communityID={comunidad.id}
        nombre={comunidad.nombre}
        calle={comunidad.calle}
        numero={comunidad.numero}
        ciudad={comunidad.ciudad}
        provincia={comunidad.provincia}
        pais={comunidad.pais}
      />
    </main>
  );
};

export default CommunitySettingsPage;
