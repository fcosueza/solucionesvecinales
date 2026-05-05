const MAX_RESERVATION_DURATION_HOURS = 2;
const RESERVATION_WINDOW_DAYS = 7;

/**
 * Rellena un número con ceros a la izquierda para que tenga al menos 2 dígitos.
 * Utilizado para formatear horas y minutos.
 *
 * @param value El valor numérico a rellenar
 * @returns El valor formateado como string con 2 dígitos
 */
const padTimePart = (value: number): string => value.toString().padStart(2, "0");

/**
 * Valida y normaliza un string de fecha en formato ISO (YYYY-MM-DD).
 *
 * @param value String con la fecha en formato YYYY-MM-DD
 * @returns El mismo valor si es válido, o null si el formato es incorrecto
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
 * Convierte un objeto Date a string con formato YYYY-MM-DD.
 *
 * @param date El objeto Date a convertir
 * @returns String con la fecha en formato YYYY-MM-DD
 */
const toReservationDateValue = (date: Date): string => {
  return [date.getUTCFullYear(), padTimePart(date.getUTCMonth() + 1), padTimePart(date.getUTCDate())].join("-");
};

/**
 * Construye un array de fechas permitidas para hacer reservas.
 * Las fechas permitidas son los próximos RESERVATION_WINDOW_DAYS días a partir de la fecha base.
 *
 * @param baseDate La fecha base (por defecto la fecha actual)
 * @returns Array de strings con las fechas permitidas en formato YYYY-MM-DD
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
 * Construye un array de horas ocupadas para una reserva.
 * Si una reserva empieza a las 10:00 con duración 2 horas, retorna [10, 11].
 *
 * @param startHour La hora de inicio de la reserva
 * @param duration La duración en horas
 * @returns Array de números de hora que ocupa la reserva
 */
const buildReservedHours = (startHour: number, duration: number): number[] => {
  return Array.from({ length: duration }, (_, index) => startHour + index);
};

/**
 * Obtiene las horas de inicio disponibles para una reserva con una duración específica.
 * Valida que no haya solapamiento con horas ya ocupadas y que respete horario de apertura.
 *
 * @param openingHour Hora de apertura de la zona común
 * @param closingHour Hora de cierre de la zona común
 * @param duration Duración deseada de la reserva en horas
 * @param occupiedHours Array de horas ya ocupadas
 * @returns Array de horas en las que se puede iniciar una reserva
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
 * Valida si una fecha está dentro del periodo de reserva permitido.
 *
 * @param date La fecha a validar
 * @param baseDate La fecha base para calcular la ventana permitida
 * @returns true si la fecha está permitida, false en caso contrario
 */
const isAllowedReservationDate = (date: string, baseDate = new Date()): boolean => {
  return buildAllowedReservationDates(baseDate).includes(date);
};

/**
 * Verifica si una reserva para hoy ya ha terminado o está completamente en el pasado.
 *
 * @param reservationDateValue Fecha de la reserva en formato YYYY-MM-DD
 * @param endHour Hora de fin de la reserva
 * @param now Fecha actual para la comparación
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
