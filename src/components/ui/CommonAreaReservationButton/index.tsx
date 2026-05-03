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
