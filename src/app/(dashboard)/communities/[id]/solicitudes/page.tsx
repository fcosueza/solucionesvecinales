import reviewCommunityRequest from "@/actions/community/communitySubscription";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

const toDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

interface CommunityRequestItem {
  id: number;
  usuario: string;
  estado: "pendiente" | "aprobada" | "denegada";
  creadoEn: Date;
  nombre: string;
  apellido: string;
  email: string;
}

const toStatusLabel = (status: CommunityRequestItem["estado"]): string => {
  if (status === "aprobada") return "APROBADA";
  if (status === "denegada") return "RECHAZADA";
  return "PENDIENTE";
};

const CommunityRequestsPage = async ({ params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const communityID = Number(id);

  if (isNaN(communityID)) {
    notFound();
  }

  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

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
      pais: true,
      adminID: true
    }
  });

  if (!community) {
    notFound();
  }

  if (community.adminID !== verifiedSession.session.userID) {
    redirect(`/communities/${communityID}/overview`);
  }

  const requests = await prisma.$queryRaw<CommunityRequestItem[]>`
    SELECT
      s."id",
      s."usuario",
      s."estado",
      s."creadoEn",
      u."nombre",
      u."apellido",
      u."email"
    FROM "Solicitud" s
    INNER JOIN "Usuario" u ON u."id" = s."usuario"
    WHERE s."comunidad" = ${communityID}
    ORDER BY s."creadoEn" DESC
  `;

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
          <h1 className={style.title}>Solicitudes</h1>
          <p className={style.communityName}>{community.nombre}</p>
          <p className={style.address}>
            {community.calle}, {community.numero}. {community.ciudad}, {community.provincia}, {community.pais}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Solicitudes de suscripcion</h2>

        {requests.length > 0 ? (
          <ul className={style.requestList}>
            {requests.map(request => {
              const isPending = request.estado === "pendiente";
              const statusClassName =
                request.estado === "aprobada"
                  ? style.statusApproved
                  : request.estado === "denegada"
                    ? style.statusRejected
                    : style.statusPending;

              return (
                <li key={request.id} className={style.requestItem}>
                  <div className={style.requestInfo}>
                    <p className={style.userName}>
                      {request.nombre} {request.apellido}
                    </p>
                    <p className={style.userEmail}>{request.email}</p>
                    <p className={style.requestDate}>Fecha: {toDateLabel(request.creadoEn)}</p>
                  </div>

                  <div className={style.requestStateWrap}>
                    <p className={`${style.requestStatus} ${statusClassName}`.trim()}>
                      {toStatusLabel(request.estado)}
                    </p>
                  </div>

                  <div className={style.requestActions}>
                    <form action={reviewCommunityRequest}>
                      <input type="hidden" name="communityID" value={communityID} />
                      <input type="hidden" name="requestID" value={request.id} />
                      <input type="hidden" name="decision" value="approve" />
                      <button
                        type="submit"
                        className={`${style.actionButton} ${style.approveButton}`.trim()}
                        disabled={!isPending}
                      >
                        Aprobar
                      </button>
                    </form>

                    <form action={reviewCommunityRequest}>
                      <input type="hidden" name="communityID" value={communityID} />
                      <input type="hidden" name="requestID" value={request.id} />
                      <input type="hidden" name="decision" value="reject" />
                      <button
                        type="submit"
                        className={`${style.actionButton} ${style.rejectButton}`.trim()}
                        disabled={!isPending}
                      >
                        Rechazar
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={style.emptyState}>No hay solicitudes registradas para esta comunidad.</p>
        )}
      </section>
    </main>
  );
};

export default CommunityRequestsPage;
