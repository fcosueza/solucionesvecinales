import ReservationCard from "@/components/ui/ReservationCard";
import AddZoneFormButton from "@/components/ui/AddZoneFormButton";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import ZoneCardWrapper from "@/components/ui/ZoneCardWrapper";
import { formatReservationDateLabel, formatTimeLabel } from "@/lib/dateFormatting";
import verifySession from "@/lib/dal";
import { buildAllowedReservationDates, toReservationDateValue } from "@/lib/reservations";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { UserRole } from "@/types";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

const helpContent: HelpContent = {
  title: "Help: Common Areas",
  summary: "Reserve community spaces and review your reservations.",
  steps: [
    "Review the available areas and their schedules.",
    "Select an area and create a valid reservation.",
    "Check your reservations in the corresponding section.",
    "Cancel or adjust reservations if the interface allows it."
  ],
  constraints: [
    "Reservations are limited by the booking window and availability.",
    "Only administrators can add new areas."
  ]
};

/**
 * Page of common areas of a community.
 *
 * Shows the common areas available for reservation and the user's current reservations.
 * Administrators can create new common areas.
 *
 * @param params Route parameters including community ID
 * @returns La community commons page rendered
 */
const CommunityCommonAreasPage = async ({ params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const communityID = Number(id);

  if (Number.isNaN(communityID)) {
    notFound();
  }

  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const allowedDates = buildAllowedReservationDates();
  const reservationWindowStart = new Date(`${allowedDates[0]}T00:00:00.000Z`);
  const reservationWindowEnd = new Date(`${allowedDates[allowedDates.length - 1]}T00:00:00.000Z`);
  const now = new Date();
  const today = new Date(`${toReservationDateValue(now)}T00:00:00.000Z`);
  const currentTime = new Date(Date.UTC(1970, 0, 1, now.getUTCHours(), now.getUTCMinutes(), 0, 0));

  const [community, userReservations] = await Promise.all([
    prisma.community.findUnique({
      where: { id: communityID },
      select: {
        id: true,
        name: true,
        street: true,
        number: true,
        city: true,
        province: true,
        country: true,
        zones: {
          select: {
            name: true,
            description: true,
            startTime: true,
            endTime: true,
            image: true,
            reservations: {
              where: {
                date: {
                  gte: reservationWindowStart,
                  lte: reservationWindowEnd
                }
              },
              select: {
                date: true,
                startTime: true,
                endTime: true
              },
              orderBy: [{ date: "asc" }, { startTime: "asc" }]
            }
          },
          orderBy: {
            name: "asc"
          }
        }
      }
    }),
    prisma.reservation.findMany({
      where: {
        community: communityID,
        user: verifiedSession.session.userID,
        OR: [{ date: { gt: today } }, { date: today, endTime: { gt: currentTime } }]
      },
      select: {
        id: true,
        community: true,
        zone: true,
        date: true,
        startTime: true,
        endTime: true
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }]
    })
  ]);

  if (!community) {
    notFound();
  }

  const hasActiveReservation = userReservations.length > 0;
  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

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
          <h1 className={style.title}>Common Areas</h1>
          <p className={style.communityName}>{community.name}</p>
          <p className={style.address}>
            {community.street}, {community.number}. {community.city}, {community.province}, {community.country}
          </p>
        </div>
      </section>

      <section className={style.infoPanel}>
        <div>
          <h2 className={style.infoTitle}>Booking rules</h2>
          <p className={style.infoText}>
            Each reservation lasts 1 or 2 hours, starts on the hour, and can be made for the next 7 days.
          </p>
        </div>
      </section>

      <section className={style.section}>
        <div className={style.sectionControls}>
          <h2 className={style.sectionTitle}>Reserve an area</h2>
          {isAdmin ? <AddZoneFormButton communityID={communityID} /> : null}
        </div>

        {community.zones.length > 0 ? (
          <div className={style.zonesGrid}>
            {community.zones.map(zone => {
              const weeklyReservations = zone.reservations.length;
              const reservationSummary =
                weeklyReservations > 0
                  ? `${weeklyReservations} reservations scheduled for the next 7 days.`
                  : "No reservations scheduled for the next week.";

              return (
                <ZoneCardWrapper
                  key={zone.name}
                  communityID={communityID}
                  zone={zone}
                  reservationSummary={reservationSummary}
                  hasActiveReservation={hasActiveReservation}
                  isAdmin={isAdmin}
                />
              );
            })}
          </div>
        ) : (
          <p className={style.emptyState}>This community does not have any common areas registered yet.</p>
        )}
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>My reservations</h2>

        {userReservations.length > 0 ? (
          <div className={style.myReservationsList}>
            {userReservations.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservationID={reservation.id}
                communityID={communityID}
                zona={reservation.zone}
                fecha={formatReservationDateLabel(reservation.date)}
                horario={`${formatTimeLabel(reservation.startTime)} - ${formatTimeLabel(reservation.endTime)}`}
              />
            ))}
          </div>
        ) : (
          <p className={style.emptyState}>You have not made any reservations in this community yet.</p>
        )}
      </section>
    </main>
  );
};

export default CommunityCommonAreasPage;
