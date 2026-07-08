import { UserRole } from "@/types";
import CardIncident from "@/components/ui/Cards/CardIncident";
import ActionButton from "@/components/ui/ActionButton";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

const helpContent: HelpContent = {
  title: "Help: Incidents",
  summary: "Manage incidents reported by the community.",
  steps: [
    "Review the list of existing incidents.",
    "Select add incidents to create a new one.",
    "Complete the issue title and description.",
    "Track the status until it is resolved."
  ],
  constraints: [
    "Incident creation may vary depending on permissions.",
    "Statuses update according to the workflow defined by the community."
  ]
};

/**
 * Community incident page.
 *
 * Lists all incidents reported in the community with their current status.
 * It allows you to report new incidents and track the resolution flow.
 *
 * @param params Route parameters including community ID
 * @returns The community issues page rendered
 */
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
      country: true
    }
  });

  if (!community) {
    notFound();
  }

  const incidents = await prisma.incident.findMany({
    where: {
      community: communityID
    },
    select: {
      community: true,
      user: true,
      date: true,
      title: true,
      description: true,
      status: true,
      updatedAt: true,
      userRef: {
        select: {
          name: true,
          lastName: true,
          email: true
        }
      }
    },
    orderBy: [
      {
        status: "asc"
      },
      {
        date: "desc"
      }
    ]
  });

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <section className={style.headerSection}>
        <Image
          src="/assets/images/default-community.jpeg"
          alt={`Community image for ${community.name}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>Incidents</h1>
          <p className={style.communityName}>{community.name}</p>
          <p className={style.address}>
            {community.street}, {community.number}. {community.city}, {community.province}, {community.country}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <div className={style.sectionControls}>
          <h2 className={style.sectionTitle}>Community incidents</h2>
          <ActionButton buttonText="+ add incidents" modalType="incident" communityID={communityID} />
        </div>

        {incidents.length > 0 ? (
          <div className={style.listViewport}>
            <ul className={style.incidentsList}>
              {incidents.map(incident => (
                <CardIncident
                  key={`${incident.community}-${incident.user}-${incident.date.toISOString()}`}
                  communityID={incident.community}
                  userID={incident.user}
                  incidentDate={incident.date}
                  title={incident.title}
                  updatedAt={incident.updatedAt}
                  userName={`${incident.userRef.name} ${incident.userRef.lastName}`}
                  userEmail={incident.userRef.email}
                  description={incident.description}
                  state={
                    incident.status === "reported"
                      ? "reportado"
                      : incident.status === "inProgress"
                        ? "procesandose"
                        : "resuelto"
                  }
                  isAdmin={isAdmin}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className={style.emptyState}>There are no incidents registered for this community.</p>
        )}
      </section>
    </main>
  );
};

export default CommunityIncidentsPage;
