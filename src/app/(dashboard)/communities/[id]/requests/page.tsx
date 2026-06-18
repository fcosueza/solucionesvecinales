import reviewCommunityRequest from "@/actions/community/communitySubscription";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
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

const helpContent: HelpContent = {
  title: "Ayuda: Solicitudes",
  summary: "Gestiona altas pendientes de usuarios en la comunidad.",
  steps: [
    "Revisa la lista ordenada de solicitudes.",
    "Consulta datos del solicitante y fecha.",
    "Aprueba o rechaza cada solicitud pendiente.",
    "Verifica el estado final tras la acción."
  ],
  constraints: [
    "Solo el administrador de la comunidad puede acceder.",
    "Las solicitudes no pendientes no se pueden volver a decidir."
  ]
};

/**
 * Converts a request status into a readable label.
 *
 * @param status Request status (approved, rejected, or other)
 * @returns String with state label in capital letters
 */
const toStatusLabel = (status: "pending" | "approved" | "rejected"): string => {
  if (status === "approved") return "APROBADA";
  if (status === "rejected") return "RECHAZADA";
  return "PENDIENTE";
};

/**
 * Community request page.
 * Lists all subscription requests received in the community.
 * Allows administrators to approve or reject new member requests.
 *
 * @component
 * @param params Route parameters including community ID
 * @returns La community requests page rendered
 */
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

  const community = await prisma.community.findUnique({
    where: {
      id: communityID
    },
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

  const requests = await prisma.request.findMany({
    where: {
      community: communityID
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      userRef: {
        select: {
          name: true,
          lastName: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <section className={style.headerSection}>
        <Image
          src="/assets/images/default-community.jpeg"
          alt={`Imagen de la comunidad ${community.name}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>Solicitudes</h1>
          <p className={style.communityName}>{community.name}</p>
          <p className={style.address}>
            {community.street}, {community.number}. {community.city}, {community.province}, {community.country}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Solicitudes de suscripcion</h2>

        {requests.length > 0 ? (
          <div className={style.listViewport}>
            <ul className={style.requestList}>
              {requests.map(request => {
                const isPending = request.status === "pending";
                const statusClassName =
                  request.status === "approved"
                    ? style.statusApproved
                    : request.status === "rejected"
                      ? style.statusRejected
                      : style.statusPending;

                return (
                  <li key={request.id} className={style.requestItem}>
                    <div className={style.requestInfo}>
                      <p className={style.userName}>
                        {request.userRef.name} {request.userRef.lastName}
                      </p>
                      <p className={style.userEmail}>{request.userRef.email}</p>
                      <p className={style.requestDate}>Fecha: {toDateLabel(request.createdAt)}</p>
                    </div>

                    <div className={style.requestStateWrap}>
                      <p className={`${style.requestStatus} ${statusClassName}`.trim()}>
                        {toStatusLabel(request.status)}
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
          </div>
        ) : (
          <p className={style.emptyState}>No hay solicitudes registradas para esta comunidad.</p>
        )}
      </section>
    </main>
  );
};

export default CommunityRequestsPage;
