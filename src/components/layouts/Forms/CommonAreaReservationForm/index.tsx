"use client";

import reserveCommonArea from "@/actions/community/communityReservation";
import {
  MAX_RESERVATION_DURATION_HOURS,
  buildAllowedReservationDates,
  formatReservationDateLabel,
  formatTimeLabel,
  getAvailableStartHours
} from "@/lib/reservations";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
  onClose: () => void;
}

const CommonAreaReservationForm = ({
  communityID,
  zoneName,
  openingHour,
  closingHour,
  existingReservations,
  onClose
}: Props): React.ReactNode => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const allowedDates = buildAllowedReservationDates().map(date => ({
    value: `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`,
    label: formatReservationDateLabel(date)
  }));
  const [selectedDate, setSelectedDate] = useState(allowedDates[0]?.value ?? "");
  const [duration, setDuration] = useState(1);

  const occupiedHours = existingReservations
    .filter(reservation => reservation.date === selectedDate)
    .flatMap(reservation => {
      return Array.from(
        { length: reservation.endHour - reservation.startHour },
        (_, index) => reservation.startHour + index
      );
    });

  const availableStartHours = getAvailableStartHours({
    openingHour,
    closingHour,
    duration,
    occupiedHours
  });

  const [selectedStartHour, setSelectedStartHour] = useState<string>(availableStartHours[0]?.toString() ?? "");

  useEffect(() => {
    if (availableStartHours.length === 0) {
      setSelectedStartHour("");
      return;
    }

    if (!availableStartHours.includes(Number(selectedStartHour))) {
      setSelectedStartHour(availableStartHours[0].toString());
    }
  }, [availableStartHours, selectedStartHour]);

  const handleReservation = async () => {
    if (!selectedDate || !selectedStartHour) {
      toast.error("No hay horas disponibles para esta combinación");
      return;
    }

    setPending(true);

    const formData = new FormData();
    formData.set("fecha", selectedDate);
    formData.set("horaInicio", selectedStartHour);
    formData.set("duracion", String(duration));

    const result = await reserveCommonArea(communityID, zoneName, formData);

    setPending(false);

    if (result.state === "success") {
      toast.success(result.message);
      router.refresh();
      onClose();
      return;
    }

    toast.error(result.message);
  };

  return (
    <div className={style.overlay} onClick={() => !pending && onClose()}>
      <div className={style.popup} onClick={event => event.stopPropagation()}>
        <h3 className={style.popupTitle}>Reservar {zoneName}</h3>
        <p className={style.popupDescription}>
          Puedes reservar entre 1 y {MAX_RESERVATION_DURATION_HOURS} horas dentro de los próximos 7 días.
        </p>

        <div className={style.fields}>
          <label className={style.field} htmlFor={`reservation-date-${zoneName}`}>
            <span>Fecha</span>
            <select
              id={`reservation-date-${zoneName}`}
              className={style.popupSelect}
              value={selectedDate}
              onChange={event => setSelectedDate(event.target.value)}
              disabled={pending}
            >
              {allowedDates.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className={style.field} htmlFor={`reservation-duration-${zoneName}`}>
            <span>Duración</span>
            <select
              id={`reservation-duration-${zoneName}`}
              className={style.popupSelect}
              value={duration}
              onChange={event => setDuration(Number(event.target.value))}
              disabled={pending}
            >
              <option value={1}>1 hora</option>
              <option value={2}>2 horas</option>
            </select>
          </label>

          <label className={style.field} htmlFor={`reservation-start-${zoneName}`}>
            <span>Hora de inicio</span>
            <select
              id={`reservation-start-${zoneName}`}
              className={style.popupSelect}
              value={selectedStartHour}
              onChange={event => setSelectedStartHour(event.target.value)}
              disabled={pending || availableStartHours.length === 0}
            >
              {availableStartHours.length > 0 ? (
                availableStartHours.map(hour => (
                  <option key={hour} value={hour}>
                    {formatTimeLabel(new Date(Date.UTC(1970, 0, 1, hour, 0, 0)))}
                  </option>
                ))
              ) : (
                <option value="">Sin disponibilidad</option>
              )}
            </select>
          </label>
        </div>

        <p className={style.availabilityMessage}>
          {availableStartHours.length > 0
            ? `Quedan ${availableStartHours.length} turnos de inicio disponibles para este día.`
            : "No quedan turnos libres con esa duración en la fecha seleccionada."}
        </p>

        <div className={style.popupActions}>
          <button type="button" className={style.cancelBtn} onClick={onClose} disabled={pending}>
            Cancelar
          </button>
          <button
            type="button"
            className={style.submitBtn}
            onClick={handleReservation}
            disabled={pending || availableStartHours.length === 0}
          >
            {pending ? "Reservando..." : "Confirmar reserva"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonAreaReservationForm;
