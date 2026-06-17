"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole, FormActionState } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Server action that creates a new common area in a community.
 * It can only be executed by the community administrator.
 * Validates that the start time is before the end time and that the name is unique.
 *
 * @param communityID - ID of the community where the zone is created
 * @param formData - FormData that must contain: name, description, starttime and endtime
 * @returns FormActionState with the result of the operation
 */
const createZone = async (communityID: number, formData: FormData): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para crear una zona común",
      payload: formData
    };
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return {
      state: "error",
      message: "No tienes permisos para crear zonas comunes",
      payload: formData
    };
  }

  if (!Number.isInteger(communityID) || communityID <= 0) {
    return {
      state: "error",
      message: "ID de comunidad no válido",
      payload: formData
    };
  }

  const community = await prisma.community.findUnique({
    where: { id: communityID },
    select: { adminId: true }
  });

  if (!community || community.adminId !== verifiedSession.session.userID) {
    return {
      state: "error",
      message: "No tienes permisos para gestionar esta comunidad",
      payload: formData
    };
  }

  const nombre = String(formData.get("nombre") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const horaInicio = String(formData.get("horaInicio") ?? "").trim();
  const horaFin = String(formData.get("horaFin") ?? "").trim();

  if (!nombre || !descripcion || !horaInicio || !horaFin) {
    return {
      state: "error",
      message: "Todos los campos son requeridos",
      payload: formData
    };
  }

  if (descripcion.length > 100) {
    return {
      state: "error",
      message: "La descripción no puede superar los 100 caracteres",
      payload: formData
    };
  }

  const parseTime = (timeStr: string): Date | null => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const [, hours, minutes] = match;
    return new Date(Date.UTC(1970, 0, 1, Number(hours), Number(minutes), 0, 0));
  };

  const horaInicioDate = parseTime(horaInicio);
  const horaFinDate = parseTime(horaFin);

  if (!horaInicioDate || !horaFinDate || horaInicioDate >= horaFinDate) {
    return {
      state: "error",
      message: "Los horarios no son válidos. La hora de fin debe ser posterior a la de inicio",
      payload: formData
    };
  }

  try {
    await prisma.zone.create({
      data: {
        name: nombre,
        description: descripcion,
        community: communityID,
        startTime: horaInicioDate,
        endTime: horaFinDate
      }
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return {
        state: "error",
        message: "Ya existe una zona con ese nombre en esta comunidad",
        payload: formData
      };
    }

    return {
      state: "error",
      message: "No se pudo crear la zona común",
      payload: formData
    };
  }

  revalidatePath(`/communities/${communityID}/zonas-comunes`);
  revalidatePath(`/communities/${communityID}/overview`);

  return {
    state: "success",
    message: "Zona común creada correctamente"
  };
};

/**
 * Server action that removes a common zone from a community.
 * It can only be executed by the community administrator.
 * Validates that the user has permissions to manage the community.
 *
 * @param communityID - ID of the community from which the zone is removed
 * @param zoneName - Name of the area to eliminate
 * @returns FormActionState with the result of the operation
 */
const deleteZone = async (communityID: number, zoneName: string): Promise<FormActionState> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return {
      state: "error",
      message: "Debes iniciar sesión para eliminar una zona común"
    };
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return {
      state: "error",
      message: "No tienes permisos para eliminar zonas comunes"
    };
  }

  if (!Number.isInteger(communityID) || communityID <= 0 || !zoneName.trim()) {
    return {
      state: "error",
      message: "Datos no válidos"
    };
  }

  const community = await prisma.community.findUnique({
    where: { id: communityID },
    select: { adminId: true }
  });

  if (!community || community.adminId !== verifiedSession.session.userID) {
    return {
      state: "error",
      message: "No tienes permisos para gestionar esta comunidad"
    };
  }

  try {
    await prisma.zone.delete({
      where: {
        name_community: {
          name: zoneName,
          community: communityID
        }
      }
    });
  } catch {
    return {
      state: "error",
      message: "No se pudo eliminar la zona común"
    };
  }

  revalidatePath(`/communities/${communityID}/zonas-comunes`);
  revalidatePath(`/communities/${communityID}/overview`);

  return {
    state: "success",
    message: "Zona común eliminada correctamente"
  };
};

/**
 * Server action that removes a common zone from the backoffice.
 * Solo puede ser ejecutada por webAdmin.
 * Revalidate backoffice routes after deleting the zone.
 *
 * @param formData - FormData that must contain: name and community
 */
const deleteZoneAdmin = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const nombre = String(formData.get("nombre") ?? "").trim();
  const comunidad = Number(formData.get("comunidad"));

  if (!nombre || !comunidad || isNaN(comunidad)) return;

  try {
    await prisma.zone.delete({
      where: { name_community: { name: nombre, community: comunidad } }
    });
    revalidatePath("/backoffice/zonas-comunes");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { createZone, deleteZone, deleteZoneAdmin };
