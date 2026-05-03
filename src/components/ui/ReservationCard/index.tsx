"use client";

import { deleteReservation } from "@/actions/community/communityReservation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

interface Props {
  reservationID: number;
  communityID: number;
  zona: string;
  fecha: string;
  horario: string;
}

const ReservationCard = ({ reservationID, communityID, zona, fecha, horario }: Props): React.ReactNode => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    const result = await deleteReservation(reservationID, communityID);
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
      <article className={style.card}>
        <div className={style.info}>
          <p className={style.zone}>{zona}</p>
          <p className={style.text}>{fecha}</p>
          <div className={style.footer}>
            <p className={style.text}>{horario}</p>
            <button type="button" className={style.deleteBtn} onClick={() => setShowConfirm(true)}>
              Cancelar reserva
            </button>
          </div>
        </div>
      </article>

      {showConfirm ? (
        <div className={style.overlay} onClick={() => !pending && setShowConfirm(false)}>
          <div
            className={style.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-reservation-title"
            onClick={event => event.stopPropagation()}
          >
            <h3 id="confirm-delete-reservation-title" className={style.popupTitle}>
              Cancelar reserva
            </h3>
            <p className={style.popupDescription}>
              ¿Seguro que quieres cancelar la reserva de <strong>{zona}</strong> el {fecha} de {horario}?
            </p>

            <div className={style.popupActions}>
              <button
                type="button"
                className={style.cancelBtn}
                onClick={() => setShowConfirm(false)}
                disabled={pending}
              >
                Volver
              </button>
              <button type="button" className={style.confirmBtn} onClick={handleDelete} disabled={pending}>
                {pending ? "Cancelando..." : "Sí, cancelar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReservationCard;
