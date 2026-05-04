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
 * Crea un objeto Date en UTC con la fecha especificada, sin hora.
 *
 * @param year El año (ejemplo: 2024)
 * @param month El mes en índice 0-11 (enero = 0, diciembre = 11)
 * @param day El día del mes (1-31)
 * @returns Un objeto Date con la fecha en UTC al inicio del día
 */
const createUTCDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
};

/**
 * Obtiene el inicio del día (a las 00:00) de una fecha dada.
 *
 * @param date La fecha a procesar
 * @returns Un objeto Date correspondiente al inicio del día UTC
 */
const startOfUTCDate = (date: Date): Date => {
  return createUTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

/**
 * Parsea un string de fecha en formato ISO (YYYY-MM-DD) a un objeto Date.
 * Valida que el formato sea correcto.
 *
 * @param value String con la fecha en formato YYYY-MM-DD
 * @returns Objeto Date si es válido, o null si el formato es incorrecto
 */
const parseReservationDate = (value: string): Date | null => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const parsedDate = createUTCDate(Number(year), Number(month) - 1, Number(day));

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
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
 * Crea un objeto Date que representa una hora específica del día (sin fecha).
 * Utilizado para comparaciones de horarios de reserva.
 *
 * @param hour La hora en formato 24h (0-23)
 * @param minute El minuto (0-59), por defecto 0
 * @returns Un objeto Date con la hora especificada
 */
const createTimeDate = (hour: number, minute = 0): Date => {
  return new Date(Date.UTC(1970, 0, 1, hour, minute, 0, 0));
};

/**
 * Extrae la hora (0-23) de un objeto Date.
 *
 * @param date El objeto Date
 * @returns La hora en formato 24h
 */
const getHourFromTime = (date: Date): number => date.getUTCHours();

/**
 * Formatea un objeto Date como etiqueta de tiempo en formato HH:MM.
 *
 * @param date El objeto Date con la hora
 * @returns String con el formato HH:MM
 */
const formatTimeLabel = (date: Date): string => {
  return `${padTimePart(date.getUTCHours())}:${padTimePart(date.getUTCMinutes())}`;
};

/**
 * Formatea un objeto Date como etiqueta de fecha en español.
 * Ejemplo: "viernes, 15/05"
 *
 * @param date El objeto Date con la fecha
 * @returns String con la fecha formateada en español
 */
const formatReservationDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC"
  }).format(date);
};

/**
 * Construye un array de fechas permitidas para hacer reservas.
 * Las fechas permitidas son los próximos RESERVATION_WINDOW_DAYS días a partir de la fecha base.
 *
 * @param baseDate La fecha base (por defecto la fecha actual)
 * @returns Array de objetos Date con las fechas permitidas
 */
const buildAllowedReservationDates = (baseDate = new Date()): Date[] => {
  const firstAllowedDay = startOfUTCDate(baseDate);

  return Array.from({ length: RESERVATION_WINDOW_DAYS }, (_, index) => {
    const nextDay = new Date(firstAllowedDay);

    nextDay.setUTCDate(firstAllowedDay.getUTCDate() + index + 1);

    return nextDay;
  });
};

/**
 * Construye un array de horas consecutivas desde la hora inicial hasta la final.
 * Utilizado para mostrar opciones de horario disponibles.
 *
 * @param startHour La hora inicial (0-23)
 * @param endHour La hora final (0-23)
 * @returns Array de números de hora
 */
const getHourlyRange = (startHour: number, endHour: number): number[] => {
  return Array.from({ length: Math.max(endHour - startHour, 0) }, (_, index) => startHour + index);
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
const isAllowedReservationDate = (date: Date, baseDate = new Date()): boolean => {
  return buildAllowedReservationDates(baseDate).map(toReservationDateValue).includes(toReservationDateValue(date));
};

/**
 * Verifica si una hora está en un horario exacto (minutos y segundos en cero).
 *
 * @param date El objeto Date a verificar
 * @returns true si la hora está completa, false en caso contrario
 */
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
