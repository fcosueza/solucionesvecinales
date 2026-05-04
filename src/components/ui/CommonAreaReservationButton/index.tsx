"use client";

import CommonAreaReservationForm from "@/components/layouts/Forms/CommonAreaReservationForm";
import { useState } from "react";
import style from "./style.module.css";

interface ExistingReservation {
  date: string;
  startHour: number;
  endHour: number;
}

interface Props {
  communityID: number;
  zoneName: string;
  openingHour: number;
  closingHour: number;
  existingReservations: ExistingReservation[];
  disabled?: boolean;
}

/**
 * Botón que abre el formulario modal de reserva de una zona común.
 * Si está deshabilitado, el usuario no puede iniciar una nueva reserva.
 *
 * @param communityID ID de la comunidad a la que pertenece la zona
 * @param zoneName Nombre de la zona común a reservar
 * @param openingHour Hora de apertura de la zona
 * @param closingHour Hora de cierre de la zona
 * @param existingReservations Lista de reservas existentes para gestionar disponibilidad
 * @param disabled Deshabilita el botón si el usuario ya tiene una reserva activa (por defecto false)
 */
const CommonAreaReservationButton = ({
  communityID,
  zoneName,
  openingHour,
  closingHour,
  existingReservations,
  disabled = false
}: Props): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className={style.button} onClick={() => setIsOpen(true)} disabled={disabled}>
        Reservar
      </button>

      {isOpen ? (
        <CommonAreaReservationForm
          communityID={communityID}
          zoneName={zoneName}
          openingHour={openingHour}
          closingHour={closingHour}
          existingReservations={existingReservations}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </>
  );
};

export default CommonAreaReservationButton;
