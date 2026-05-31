/**
 * Fill a number with leading zeros until it has 2 digits.
 *
 * @param value Numeric value to format
 * @returns String with 2 digits
 */
const padTimePart = (value: number): string => value.toString().padStart(2, "0");

/**
 * Formats a Date object as time in HH:MM format using UTC.
 *
 * @param date Date with time to display
 * @returns Hora formateada en texto
 */
const formatTimeLabel = (date: Date): string => {
  return `${padTimePart(date.getUTCHours())}:${padTimePart(date.getUTCMinutes())}`;
};

/**
 * Formats an exact time in HH:00 format.
 *
 * @param hour Time in 24h format
 * @returns Hora formateada en texto
 */
const formatHourLabel = (hour: number): string => `${padTimePart(hour)}:00`;

/**
 * Formats a reservation date in Spanish with day of the week and short date.
 *
 * @param date Date as Date or string YYYY-MM-DD
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
