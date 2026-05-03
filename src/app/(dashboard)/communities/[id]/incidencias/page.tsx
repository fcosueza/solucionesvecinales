import { UserRole } from "@/types";
import CardIncident from "@/components/ui/Cards/CardIncident";
import ActionButton from "@/components/ui/ActionButton";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

type IncidentState = "reportado" | "procesandose" | "resuelto";

interface IncidentItem {
  comunidad: number;
  usuario: string;
  fecha: Date;
  titulo: string;
  descripcion: string;
  estado: IncidentState;
  actualizadaEn: Date;
  usuarioID: {
    nombre: string;
    apellido: string;
    email: string;
  };
}

const CommunityIncidentsPage = async ({ params }: Props): Promise<React.ReactNode> => {
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

  const community = await prisma.comunidad.findUnique({
    where: {
      id: communityID
    },
    select: {
      id: true,
      nombre: true,
      calle: true,
      numero: true,
      ciudad: true,
      provincia: true,
      pais: true
    }
  });

  if (!community) {
    notFound();
  }

  const incidents = await prisma.incidencia.findMany({
    where: {
      comunidad: communityID
    },
    select: {
      comunidad: true,
      usuario: true,
      fecha: true,
      titulo: true,
      descripcion: true,
      estado: true,
      actualizadaEn: true,
      usuarioID: {
        select: {
          nombre: true,
          apellido: true,
          email: true
        }
      }
    },
    orderBy: [
      {
        estado: "asc"
      },
      {
        fecha: "desc"
      }
    ]
  });

  return (
    <main className={style.main}>
      <section className={style.headerSection}>
        <Image
          src="/assets/images/default-community.jpeg"
          alt={`Imagen de la comunidad ${community.nombre}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>Incidencias</h1>
          <p className={style.communityName}>{community.nombre}</p>
          <p className={style.address}>
            {community.calle}, {community.numero}. {community.ciudad}, {community.provincia}, {community.pais}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <div className={style.sectionControls}>
          <h2 className={style.sectionTitle}>Incidencias de la comunidad</h2>
          <ActionButton buttonText="+ añadir incidencias" modalType="incident" communityID={communityID} />
        </div>

        {incidents.length > 0 ? (
          <div className={style.listViewport}>
            <ul className={style.incidentsList}>
              {incidents.map((incident: IncidentItem) => (
                <CardIncident
                  key={`${incident.comunidad}-${incident.usuario}-${incident.fecha.toISOString()}`}
                  communityID={incident.comunidad}
                  userID={incident.usuario}
                  incidentDate={incident.fecha}
                  title={incident.titulo}
                  updatedAt={incident.actualizadaEn}
                  userName={`${incident.usuarioID.nombre} ${incident.usuarioID.apellido}`}
                  userEmail={incident.usuarioID.email}
                  description={incident.descripcion}
                  state={incident.estado}
                  isAdmin={isAdmin}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className={style.emptyState}>No hay incidencias registradas para esta comunidad.</p>
        )}
      </section>
    </main>
  );
};

export default CommunityIncidentsPage;
