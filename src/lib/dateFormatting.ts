/**
 * Rellena un número con ceros a la izquierda hasta tener 2 dígitos.
 *
 * @param value Valor numérico a formatear
 * @returns String con 2 dígitos
 */
const padTimePart = (value: number): string => value.toString().padStart(2, "0");

/**
 * Formatea un objeto Date como hora en formato HH:MM usando UTC.
 *
 * @param date Fecha con la hora a mostrar
 * @returns Hora formateada en texto
 */
const formatTimeLabel = (date: Date): string => {
  return `${padTimePart(date.getUTCHours())}:${padTimePart(date.getUTCMinutes())}`;
};

/**
 * Formatea una hora exacta en formato HH:00.
 *
 * @param hour Hora en formato 24h
 * @returns Hora formateada en texto
 */
const formatHourLabel = (hour: number): string => `${padTimePart(hour)}:00`;

/**
 * Formatea una fecha de reserva en español con día de la semana y fecha corta.
 *
 * @param date Fecha como Date o string YYYY-MM-DD
 * @returns Fecha formateada en texto
 */
const formatReservationDateLabel = (date: Date | string): string => {
  const reservationDate = typeof date === "string" ? new Date(`${date}T00:00:00.000Z`) : date;

  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC"
  }).format(reservationDate);
};

export { formatHourLabel, formatReservationDateLabel, formatTimeLabel };
