"use client";

import { deleteZone } from "@/actions/community/communityZone";
import CardCommonArea from "@/components/ui/Cards/CardCommonArea";
import CommonAreaReservationButton from "@/components/ui/CommonAreaReservationButton";
import { toReservationDateValue } from "@/lib/reservations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Zone {
  nombre: string;
  descripcion: string;
  hora_inicio: Date;
  hora_fin: Date;
  imagen: string | null;
  reservas: Array<{
    fecha: Date;
    hora_inicio: Date;
    hora_fin: Date;
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
 * Componente contenedor de tarjeta de zona común.
 * Renderiza la tarjeta con el botón de reserva integrado y,
 * si el usuario es administrador, la opción de eliminar la zona con confirmación.
 *
 * @param communityID ID de la comunidad a la que pertenece la zona
 * @param zone Objeto con los datos de la zona (nombre, descripción, horario, reservas)
 * @param reservationSummary Texto resumen de la disponibilidad de la zona
 * @param hasActiveReservation Indica si el usuario ya tiene una reserva activa en esta zona
 * @param isAdmin Indica si el usuario actual es administrador de la comunidad
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
    const result = await deleteZone(communityID, zone.nombre);
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
        nombre={zone.nombre}
        descripcion={zone.descripcion}
        horaInicio={zone.hora_inicio}
        horaFin={zone.hora_fin}
        imageUrl={zone.imagen ?? "/assets/images/default-community.jpeg"}
        reservationSummary={reservationSummary}
        isAdmin={isAdmin}
        onDeleteRequest={() => setShowConfirm(true)}
        action={
          <CommonAreaReservationButton
            communityID={communityID}
            zoneName={zone.nombre}
            openingHour={zone.hora_inicio.getUTCHours()}
            closingHour={zone.hora_fin.getUTCHours()}
            existingReservations={zone.reservas.map(reservation => ({
              date: toReservationDateValue(reservation.fecha),
              startHour: reservation.hora_inicio.getUTCHours(),
              endHour: reservation.hora_fin.getUTCHours()
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
              ¿Seguro que quieres eliminar la zona <strong>{zone.nombre}</strong>? Se cancelarán todas las reservas
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
