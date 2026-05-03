const MAX_RESERVATION_DURATION_HOURS = 2;
const RESERVATION_WINDOW_DAYS = 7;

const padTimePart = (value: number): string => value.toString().padStart(2, "0");

const createUTCDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
};

const startOfUTCDate = (date: Date): Date => {
  return createUTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

const parseReservationDate = (value: string): Date | null => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const parsedDate = createUTCDate(Number(year), Number(month) - 1, Number(day));

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const toReservationDateValue = (date: Date): string => {
  return [date.getUTCFullYear(), padTimePart(date.getUTCMonth() + 1), padTimePart(date.getUTCDate())].join("-");
};

const createTimeDate = (hour: number, minute = 0): Date => {
  return new Date(Date.UTC(1970, 0, 1, hour, minute, 0, 0));
};

const getHourFromTime = (date: Date): number => date.getUTCHours();

const formatTimeLabel = (date: Date): string => {
  return `${padTimePart(date.getUTCHours())}:${padTimePart(date.getUTCMinutes())}`;
};

const formatReservationDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC"
  }).format(date);
};

const buildAllowedReservationDates = (baseDate = new Date()): Date[] => {
  const firstAllowedDay = startOfUTCDate(baseDate);

  return Array.from({ length: RESERVATION_WINDOW_DAYS }, (_, index) => {
    const nextDay = new Date(firstAllowedDay);

    nextDay.setUTCDate(firstAllowedDay.getUTCDate() + index + 1);

    return nextDay;
  });
};

const getHourlyRange = (startHour: number, endHour: number): number[] => {
  return Array.from({ length: Math.max(endHour - startHour, 0) }, (_, index) => startHour + index);
};

const buildReservedHours = (startHour: number, duration: number): number[] => {
  return Array.from({ length: duration }, (_, index) => startHour + index);
};

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

const isAllowedReservationDate = (date: Date, baseDate = new Date()): boolean => {
  return buildAllowedReservationDates(baseDate).map(toReservationDateValue).includes(toReservationDateValue(date));
};

const isWholeHourTime = (date: Date): boolean => date.getUTCMinutes() === 0 && date.getUTCSeconds() === 0;

export {
  MAX_RESERVATION_DURATION_HOURS,
  RESERVATION_WINDOW_DAYS,
  buildAllowedReservationDates,
  buildReservedHours,
  createTimeDate,
  formatReservationDateLabel,
  formatTimeLabel,
  getAvailableStartHours,
  getHourFromTime,
  getHourlyRange,
  isAllowedReservationDate,
  isWholeHourTime,
  parseReservationDate,
  startOfUTCDate,
  toReservationDateValue
};
