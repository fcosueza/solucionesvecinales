"use client";

import { deleteZone } from "@/actions/community/communityZone";
import CardCommonArea from "@/components/ui/Cards/CardCommonArea";
import CommonAreaReservationButton from "@/components/ui/CommonAreaReservationButton";
import { toReservationDateValue } from "@/lib/reservations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Zone {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  image: string | null;
  reservations: Array<{
    date: Date;
    startTime: Date;
    endTime: Date;
  }>;
}

interface Props {
  communityID: number;
  zone: Zone;
  reservationSummary: string;
  hasActiveReservation: boolean;
  isAdmin: boolean;
}

/**
 * Common zone card container component.
 * Render the card with the integrated reservation button and,
 * if the user is an administrator, the option to delete the zone with confirmation.
 *
 * @param communityID ID of the community to which the zone belongs
 * @param zone Object with area data (name, description, schedule, reservations)
 * @param reservationSummary Texto resumen de la disponibilidad de la zona
 * @param hasActiveReservation Indicates if the user already has an active reservation in this area
 * @param isAdmin Indicates if the current user is a community administrator
 */
const ZoneCardWrapper = ({
  communityID,
  zone,
  reservationSummary,
  hasActiveReservation,
  isAdmin
}: Props): React.ReactNode => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    const result = await deleteZone(communityID, zone.name);
    setPending(false);

    if (result.state === "success") {
      toast.success(result.message);
      router.refresh();
      return;
    }

    toast.error(result.message);
    setShowConfirm(false);
  };

  return (
    <>
      <CardCommonArea
        name={zone.name}
        description={zone.description}
        startTime={zone.startTime}
        endTime={zone.endTime}
        imageUrl={zone.image ?? "/assets/images/default-community.jpeg"}
        reservationSummary={reservationSummary}
        isAdmin={isAdmin}
        onDeleteRequest={() => setShowConfirm(true)}
        action={
          <CommonAreaReservationButton
            communityID={communityID}
            zoneName={zone.name}
            openingHour={zone.startTime.getUTCHours()}
            closingHour={zone.endTime.getUTCHours()}
            existingReservations={zone.reservations.map(reservation => ({
              date: toReservationDateValue(reservation.date),
              startHour: reservation.startTime.getUTCHours(),
              endHour: reservation.endTime.getUTCHours()
            }))}
            disabled={hasActiveReservation}
          />
        }
      />

      {showConfirm ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 40
          }}
          onClick={() => !pending && setShowConfirm(false)}
        >
          <div
            style={{
              width: "min(100%, 44rem)",
              background: "#ffffff",
              borderRadius: "1.6rem",
              padding: "2.4rem",
              boxShadow: "0 2rem 5rem rgba(15, 23, 42, 0.22)"
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-zone-title"
            onClick={event => event.stopPropagation()}
          >
            <h3 id="confirm-delete-zone-title" style={{ fontSize: "2.2rem", fontWeight: 700 }}>
              Eliminar zona
            </h3>
            <p style={{ marginTop: "1rem", fontSize: "1.5rem", lineHeight: 1.6, color: "var(--font-color-secondary)" }}>
              ¿Seguro que quieres eliminar la zona <strong>{zone.name}</strong>? Se cancelarán todas las reservas
              asociadas.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
              <button
                type="button"
                style={{
                  border: "none",
                  borderRadius: "1rem",
                  padding: "1rem 1.6rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  background: "#edf1f7",
                  color: "var(--font-color)",
                  cursor: "pointer"
                }}
                onClick={() => setShowConfirm(false)}
                disabled={pending}
              >
                Cancelar
              </button>
              <button
                type="button"
                style={{
                  border: "none",
                  borderRadius: "1rem",
                  padding: "1rem 1.6rem",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  background: "#c62828",
                  color: "#ffffff",
                  cursor: "pointer",
                  opacity: pending ? 0.6 : 1
                }}
                onClick={handleDelete}
                disabled={pending}
              >
                {pending ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ZoneCardWrapper;
