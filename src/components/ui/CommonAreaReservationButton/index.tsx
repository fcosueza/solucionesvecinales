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
 * Button that opens the modal reservation form for a common area.
 * If disabled, the user cannot start a new reservation.
 *
 * @param communityID ID of the community to which the zone belongs
 * @param zoneName Name of the common area to reserve
 * @param openingHour Area opening time
 * @param closingHour Zone closing time
 * @param existingReservations List of existing reservations to manage availability
 * @param disabled Disables the button if the user already has an active reservation (default false)
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
