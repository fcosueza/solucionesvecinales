const MAX_RESERVATION_DURATION_HOURS = 2;
const RESERVATION_WINDOW_DAYS = 7;

/**
 * Fill a number with leading zeros so that it has at least 2 digits.
 * Used to format hours and minutes.
 *
 * @param value The numerical value to fill
 * @returns El value formatted as string with 2 digits
 */
const padTimePart = (value: number): string => value.toString().padStart(2, "0");

/**
 * Validates and normalizes a date string in ISO format (YYYY-MM-DD).
 *
 * @param value String with the date in YYYY-MM-DD format
 * @returns El same value if valid, or null if the format is incorrect
 */
const parseReservationDate = (value: string): string | null => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return toReservationDateValue(parsedDate) === value ? value : null;
};

/**
 * Converts a Date object to a string with YYYY-MM-DD format.
 *
 * @param date El objeto Date a convertir
 * @returns String with the date in YYYY-MM-DD format
 */
const toReservationDateValue = (date: Date): string => {
  return [date.getUTCFullYear(), padTimePart(date.getUTCMonth() + 1), padTimePart(date.getUTCDate())].join("-");
};

/**
 * Builds an array of dates allowed to make reservations.
 * The allowed dates are the next RESERVATION_WINDOW_DAYS days from the base date.
 *
 * @param baseDate The base date (defaults to the current date)
 * @returns Array of strings with the allowed dates in YYYY-MM-DD format
 */
const buildAllowedReservationDates = (baseDate = new Date()): string[] => {
  const firstAllowedDay = new Date(
    Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate() + 1, 0, 0, 0, 0)
  );

  return Array.from({ length: RESERVATION_WINDOW_DAYS }, (_, index) => {
    const nextDay = new Date(firstAllowedDay);

    nextDay.setUTCDate(firstAllowedDay.getUTCDate() + index);

    return toReservationDateValue(nextDay);
  });
};

/**
 * Builds an array of busy hours for a reservation.
 * If a reservation starts at 10:00 with a duration of 2 hours, it returns [10, 11].
 *
 * @param startHour The start time of the reservation
 * @param duration The duration in hours
 * @returns Array of hour numbers occupied by the reservation
 */
const buildReservedHours = (startHour: number, duration: number): number[] => {
  return Array.from({ length: duration }, (_, index) => startHour + index);
};

/**
 * Gets the available start times for a reservation with a specific duration.
 * Validate that there is no overlap with hours already occupied and that opening hours are respected.
 *
 * @param openingHour Opening time of the common area
 * @param closingHour Closing time of the common area
 * @param duration Desired duration of the reservation in hours
 * @param occupiedHours Array of hours already occupied
 * @returns Array of hours in which a reservation can be started
 */
const getAvailableStartHours = ({
  openingHour,
  closingHour,
  duration,
  occupiedHours
}: {
  openingHour: number;
  closingHour: number;
  duration: number;
  occupiedHours: number[];
}): number[] => {
  if (duration < 1 || duration > MAX_RESERVATION_DURATION_HOURS) {
    return [];
  }

  const occupiedHoursSet = new Set(occupiedHours);
  const latestStartHour = closingHour - duration;
  const availableHours: number[] = [];

  for (let startHour = openingHour; startHour <= latestStartHour; startHour += 1) {
    const overlaps = buildReservedHours(startHour, duration).some(hour => occupiedHoursSet.has(hour));

    if (!overlaps) {
      availableHours.push(startHour);
    }
  }

  return availableHours;
};

/**
 * Valid if a date is within the allowed reservation period.
 *
 * @param date The date to validate
 * @param baseDate The base date to calculate the allowed window
 * @returns true if date is allowed, false otherwise
 */
const isAllowedReservationDate = (date: string, baseDate = new Date()): boolean => {
  return buildAllowedReservationDates(baseDate).includes(date);
};

/**
 * Checks if a reservation for today has already ended or is completely in the past.
 *
 * @param reservationDateValue Reservation date in YYYY-MM-DD format
 * @param endHour Reservation end time
 * @param now Current date for comparison
 * @returns true si la franja ya ha pasado, false en caso contrario
 */
const isReservationSlotInPast = (reservationDateValue: string, endHour: number, now = new Date()): boolean => {
  const currentDateValue = toReservationDateValue(now);
  const currentMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  return reservationDateValue === currentDateValue && endHour * 60 <= currentMinutes;
};

export {
  MAX_RESERVATION_DURATION_HOURS,
  RESERVATION_WINDOW_DAYS,
  buildAllowedReservationDates,
  buildReservedHours,
  getAvailableStartHours,
  isAllowedReservationDate,
  isReservationSlotInPast,
  parseReservationDate,
  toReservationDateValue
};
