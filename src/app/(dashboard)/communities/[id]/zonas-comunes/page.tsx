import ReservationCard from "@/components/ui/ReservationCard";
import AddZoneFormButton from "@/components/ui/AddZoneFormButton";
import ZoneCardWrapper from "@/components/ui/ZoneCardWrapper";
import verifySession from "@/lib/dal";
import { buildAllowedReservationDates, formatReservationDateLabel, formatTimeLabel } from "@/lib/reservations";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { UserRole } from "@/types";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

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
  const reservationWindowStart = allowedDates[0];
  const reservationWindowEnd = allowedDates[allowedDates.length - 1];
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
  const currentTime = new Date(Date.UTC(1970, 0, 1, now.getUTCHours(), now.getUTCMinutes(), 0, 0));

  const [community, userReservations] = await Promise.all([
    prisma.comunidad.findUnique({
      where: { id: communityID },
      select: {
        id: true,
        nombre: true,
        calle: true,
        numero: true,
        ciudad: true,
        provincia: true,
        pais: true,
        zonas: {
          select: {
            nombre: true,
            descripcion: true,
            hora_inicio: true,
            hora_fin: true,
            imagen: true,
            reservas: {
              where: {
                fecha: {
                  gte: reservationWindowStart,
                  lte: reservationWindowEnd
                }
              },
              select: {
                fecha: true,
                hora_inicio: true,
                hora_fin: true
              },
              orderBy: [{ fecha: "asc" }, { hora_inicio: "asc" }]
            }
          },
          orderBy: {
            nombre: "asc"
          }
        }
      }
    }),
    prisma.reserva.findMany({
      where: {
        comunidad: communityID,
        usuario: verifiedSession.session.userID,
        OR: [{ fecha: { gt: today } }, { fecha: today, hora_fin: { gt: currentTime } }]
      },
      select: {
        id: true,
        comunidad: true,
        zona: true,
        fecha: true,
        hora_inicio: true,
        hora_fin: true
      },
      orderBy: [{ fecha: "asc" }, { hora_inicio: "asc" }]
    })
  ]);

  if (!community) {
    notFound();
  }

  const hasActiveReservation = userReservations.length > 0;
  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

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
          <h1 className={style.title}>Zonas comunes</h1>
          <p className={style.communityName}>{community.nombre}</p>
          <p className={style.address}>
            {community.calle}, {community.numero}. {community.ciudad}, {community.provincia}, {community.pais}
          </p>
        </div>
      </section>

      <section className={style.infoPanel}>
        <div>
          <h2 className={style.infoTitle}>Normas de reserva</h2>
          <p className={style.infoText}>
            Cada reserva dura 1 o 2 horas, siempre en punto, y se puede hacer para los próximos 7 días.
          </p>
        </div>
      </section>

      <section className={style.section}>
        <div className={style.sectionControls}>
          <h2 className={style.sectionTitle}>Reservar una zona</h2>
          {isAdmin ? <AddZoneFormButton communityID={communityID} /> : null}
        </div>

        {community.zonas.length > 0 ? (
          <div className={style.zonesGrid}>
            {community.zonas.map(zone => {
              const weeklyReservations = zone.reservas.length;
              const reservationSummary =
                weeklyReservations > 0
                  ? `${weeklyReservations} reservas previstas para los próximos 7 días.`
                  : "Sin reservas previstas en la próxima semana.";

              return (
                <ZoneCardWrapper
                  key={zone.nombre}
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
          <p className={style.emptyState}>Esta comunidad todavía no tiene zonas comunes registradas.</p>
        )}
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Mis reservas</h2>

        {userReservations.length > 0 ? (
          <div className={style.myReservationsList}>
            {userReservations.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservationID={reservation.id}
                communityID={communityID}
                zona={reservation.zona}
                fecha={formatReservationDateLabel(reservation.fecha)}
                horario={`${formatTimeLabel(reservation.hora_inicio)} - ${formatTimeLabel(reservation.hora_fin)}`}
              />
            ))}
          </div>
        ) : (
          <p className={style.emptyState}>Aún no has realizado ninguna reserva en esta comunidad.</p>
        )}
      </section>
    </main>
  );
};

export default CommunityCommonAreasPage;
