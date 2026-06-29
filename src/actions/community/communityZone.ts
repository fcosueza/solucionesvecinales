"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole, FormActionState } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Creates a new common area in a community managed by the authenticated admin.
 *
 * @param communityID Community identifier
 * @param formData Form data with zone name, description and time range
 * @returns Form action state with creation result
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

  const name = String(formData.get("nombre") ?? "").trim();
  const description = String(formData.get("descripcion") ?? "").trim();
  const startTime = String(formData.get("horaInicio") ?? "").trim();
  const endTime = String(formData.get("horaFin") ?? "").trim();

  if (!name || !description || !startTime || !endTime) {
    return {
      state: "error",
      message: "Todos los campos son requeridos",
      payload: formData
    };
  }

  if (description.length > 100) {
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

  const startTimeDate = parseTime(startTime);
  const endTimeDate = parseTime(endTime);

  if (!startTimeDate || !endTimeDate || startTimeDate >= endTimeDate) {
    return {
      state: "error",
      message: "Los horarios no son válidos. La hora de fin debe ser posterior a la de inicio",
      payload: formData
    };
  }

  try {
    await prisma.zone.create({
      data: {
        name: name,
        description: description,
        community: communityID,
        startTime: startTimeDate,
        endTime: endTimeDate
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
 * Deletes a common area from a community managed by the authenticated admin.
 *
 * @param communityID Community identifier
 * @param zoneName Zone name
 * @returns Form action state with deletion result
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
 * Deletes a common area from backoffice when executed by a web administrator.
 *
 * @param formData Form data containing the community id and zone name
 */
const deleteZoneAdmin = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const name = String(formData.get("nombre") ?? "").trim();
  const community = Number(formData.get("comunidad"));

  if (!name || !community || isNaN(community)) return;

  try {
    await prisma.zone.delete({
      where: { name_community: { name: name, community: community } }
    });
    revalidatePath("/backoffice/zonas-comunes");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { createZone, deleteZone, deleteZoneAdmin };
