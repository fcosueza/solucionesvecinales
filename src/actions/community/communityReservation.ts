"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import {
  MAX_RESERVATION_DURATION_HOURS,
  buildReservedHours,
  createTimeDate,
  getHourFromTime,
  isAllowedReservationDate,
  parseReservationDate,
  startOfUTCDate
} from "@/lib/reservations";
import { FormActionState } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Construye el filtro para obtener las reservas futuras de un usuario.
 * Incluye reservas con fecha posterior a hoy o reservas de hoy que aún no han finalizado.
 *
 * @param userID ID del usuario
 * @param currentDate La fecha actual
 * @param currentTime La hora actual
 * @returns Objeto de filtro para Prisma
 */
const getUpcomingReservationFilter = (userID: string, currentDate: Date, currentTime: Date) => ({
  usuario: userID,
  OR: [{ fecha: { gt: currentDate } }, { fecha: currentDate, hora_fin: { gt: currentTime } }]
});

/**
 * Crea un estado de error estandarizado para las respuestas de reserva.
 *
 * @param message Mensaje de error a mostrar al usuario
 * @param formData Datos del formulario opcional para devolver al cliente
 * @returns Objeto FormActionState con estado de error
 */
const createReservationError = (message: string, formData?: FormData): FormActionState => ({
  state: "error",
  message,
  payload: formData
});

/**
 * Server action que crea una nueva reserva en una zona común de una comunidad.
 * Valida que la fecha y horario estén disponibles, que respeten los límites de reserva,
 * y que el usuario esté inscrito en la comunidad.
 *
 * @param communityID ID de la comunidad
 * @param zoneName Nombre de la zona común a reservar
 * @param formData FormData que debe contener: fecha, horaInicio y duracion
 * @returns FormActionState con el resultado de la operación
 */
const reserveCommonArea = async (
  communityID: number,
  zoneName: string,
  formData: FormData
): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return createReservationError("Debes iniciar sesión para reservar una zona común", formData);
  }

  const reservationDateInput = String(formData.get("fecha") ?? "").trim();
  const startHour = Number(formData.get("horaInicio"));
  const duration = Number(formData.get("duracion"));
  const reservationDate = parseReservationDate(reservationDateInput);

  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !zoneName.trim() ||
    !reservationDate ||
    !Number.isInteger(startHour) ||
    !Number.isInteger(duration) ||
    duration < 1 ||
    duration > MAX_RESERVATION_DURATION_HOURS
  ) {
    return createReservationError("Los datos de la reserva no son válidos", formData);
  }

  if (!isAllowedReservationDate(reservationDate)) {
    return createReservationError("Solo puedes reservar dentro de los próximos 7 días", formData);
  }

  const [inscription, zone] = await Promise.all([
    prisma.inscripcion.findUnique({
      where: {
        usuario_comunidad: {
          usuario: verifiedSession.session.userID,
          comunidad: communityID
        }
      },
      select: {
        usuario: true
      }
    }),
    prisma.zona.findUnique({
      where: {
        nombre_comunidad: {
          nombre: zoneName,
          comunidad: communityID
        }
      },
      select: {
        nombre: true,
        hora_inicio: true,
        hora_fin: true
      }
    })
  ]);

  if (!inscription) {
    return createReservationError("No perteneces a esta comunidad", formData);
  }

  if (!zone) {
    return createReservationError("La zona común no existe", formData);
  }

  const openingHour = getHourFromTime(zone.hora_inicio);
  const closingHour = getHourFromTime(zone.hora_fin);
  const endHour = startHour + duration;

  if (startHour < openingHour || endHour > closingHour) {
    return createReservationError("La reserva debe quedar dentro del horario disponible de la zona", formData);
  }

  const now = new Date();
  const today = startOfUTCDate(now);
  const currentTime = createTimeDate(now.getUTCHours(), now.getUTCMinutes());

  if (reservationDate.getTime() === today.getTime() && createTimeDate(endHour) <= currentTime) {
    return createReservationError("No puedes reservar una franja que ya ha pasado", formData);
  }

  try {
    const result = await prisma.$transaction(async tx => {
      const activeReservation = await tx.reserva.findFirst({
        where: getUpcomingReservationFilter(verifiedSession.session!.userID, today, currentTime),
        select: {
          id: true
        }
      });

      if (activeReservation) {
        return { state: "active-reservation" as const };
      }

      const reservedHours = buildReservedHours(startHour, duration);
      const reservedTimeDates = reservedHours.map(hour => createTimeDate(hour));

      const overlappingSlots = await tx.reservaFranja.findMany({
        where: {
          comunidad: communityID,
          zona: zoneName,
          fecha: reservationDate,
          hora: {
            in: reservedTimeDates
          }
        },
        select: {
          id: true
        }
      });

      if (overlappingSlots.length > 0) {
        return { state: "overlap" as const };
      }

      await tx.reserva.create({
        data: {
          usuario: verifiedSession.session!.userID,
          comunidad: communityID,
          zona: zoneName,
          fecha: reservationDate,
          hora_inicio: createTimeDate(startHour),
          hora_fin: createTimeDate(endHour),
          franjas: {
            create: reservedTimeDates.map(timeDate => ({
              comunidad: communityID,
              zona: zoneName,
              fecha: reservationDate,
              hora: timeDate
            }))
          }
        }
      });

      return { state: "success" as const };
    });

    if (result.state === "active-reservation") {
      return createReservationError("Solo puedes tener una reserva activa a la vez", formData);
    }

    if (result.state === "overlap") {
      return createReservationError("La franja seleccionada ya está reservada", formData);
    }
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return createReservationError("La franja seleccionada acaba de ocuparse. Elige otra distinta", formData);
    }

    return createReservationError("No se pudo completar la reserva. Inténtalo de nuevo", formData);
  }

  revalidatePath(`/communities/${communityID}/overview`);
  revalidatePath(`/communities/${communityID}/zonas-comunes`);

  return {
    state: "success",
    message: "Reserva creada correctamente"
  };
};

const deleteReservation = async (reservationID: number, communityID: number): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return createReservationError("Debes iniciar sesión para cancelar una reserva");
  }

  if (!Number.isInteger(reservationID) || reservationID <= 0 || !Number.isInteger(communityID) || communityID <= 0) {
    return createReservationError("Datos de la reserva no válidos");
  }

  const reservation = await prisma.reserva.findFirst({
    where: {
      id: reservationID,
      usuario: verifiedSession.session.userID,
      comunidad: communityID
    },
    select: { id: true }
  });

  if (!reservation) {
    return createReservationError("No se encontró la reserva o no tienes permiso para eliminarla");
  }

  try {
    await prisma.reserva.delete({ where: { id: reservationID } });
  } catch {
    return createReservationError("No se pudo cancelar la reserva. Inténtalo de nuevo");
  }

  revalidatePath(`/communities/${communityID}/overview`);
  revalidatePath(`/communities/${communityID}/zonas-comunes`);

  return { state: "success", message: "Reserva cancelada correctamente" };
};

export { deleteReservation };
export default reserveCommonArea;
