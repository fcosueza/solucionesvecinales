"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/types";

type IncidentState = "reportado" | "procesandose" | "resuelto";

/**
 * Gets the next status in the progression of an issue.
 * The progression is: reported -> processing -> resolved
 *
 * @param currentState Current incident status
 * @returns Next status in the sequence
 */
const getNextState = (currentState: IncidentState): IncidentState => {
  if (currentState === "reportado") {
    return "procesandose";
  }

  if (currentState === "procesandose") {
    return "resuelto";
  }

  return "resuelto";
};

/**
 * Updates the status of an issue to the next status in the progression.
 * It can only be executed by registered members of the community.
 * Validate permissions before updating.
 *
 * @param formData FormData that must contain: communityID, userID and incidentDate
 */
const updateIncidentStatus = async (formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const communityID = Number(formData.get("communityID"));
  const userID = String(formData.get("userID") ?? "").trim();
  const incidentDateInput = String(formData.get("incidentDate") ?? "").trim();
  const incidentDate = new Date(incidentDateInput);

  if (!Number.isInteger(communityID) || communityID <= 0 || !userID || Number.isNaN(incidentDate.getTime())) {
    return;
  }

  const inscription = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: verifiedSession.session.userID,
        comunidad: communityID
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscription) {
    return;
  }

  const incident = await prisma.incidencia.findFirst({
    where: {
      comunidad: communityID,
      usuario: userID,
      fecha: incidentDate
    },
    select: {
      estado: true
    }
  });

  if (!incident || incident.estado === "resuelto") {
    return;
  }

  const nextState = getNextState(incident.estado);

  await prisma.incidencia.updateMany({
    where: {
      comunidad: communityID,
      usuario: userID,
      fecha: incidentDate,
      estado: incident.estado
    },
    data: {
      estado: nextState,
      actualizadaEn: new Date()
    }
  });

  revalidatePath(`/communities/${communityID}/incidencias`);
  revalidatePath(`/communities/${communityID}/overview`);
};

/**
 * Delete an incident from the database. It can only be executed by administrators.
 * Revalidates issues backoffice routes after deleting.
 *
 * @param formData FormData that must contain the ID of the incident to be deleted
 */
const deleteIncident = async (formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return;
  }

  const communityID = Number(formData.get("communityID"));
  const userID = String(formData.get("userID") ?? "").trim();
  const incidentDateInput = String(formData.get("incidentDate") ?? "").trim();
  const incidentDate = new Date(incidentDateInput);

  if (!Number.isInteger(communityID) || communityID <= 0 || !userID || Number.isNaN(incidentDate.getTime())) {
    return;
  }

  const inscription = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: verifiedSession.session.userID,
        comunidad: communityID
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscription) {
    return;
  }

  const incident = await prisma.incidencia.findFirst({
    where: {
      comunidad: communityID,
      usuario: userID,
      fecha: incidentDate
    },
    select: {
      estado: true
    }
  });

  if (!incident || incident.estado !== "resuelto") {
    return;
  }

  try {
    await prisma.incidencia.delete({
      where: {
        comunidad_usuario_fecha: {
          comunidad: communityID,
          usuario: userID,
          fecha: incidentDate
        }
      }
    });

    revalidatePath(`/communities/${communityID}/incidencias`);
    revalidatePath(`/communities/${communityID}/overview`);
  } catch {}
};

const addIncident = async (communityID: number, formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const title = String(formData.get("titulo") ?? "").trim();
  const description = String(formData.get("descripcion") ?? "").trim();

  if (!Number.isInteger(communityID) || communityID <= 0 || !title || !description) {
    return;
  }

  const inscription = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: verifiedSession.session.userID,
        comunidad: communityID
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscription) {
    return;
  }

  try {
    await prisma.incidencia.create({
      data: {
        comunidad: communityID,
        usuario: verifiedSession.session.userID,
        titulo: title,
        descripcion: description,
        estado: "reportado"
      }
    });

    revalidatePath(`/communities/${communityID}/incidencias`);
    revalidatePath(`/communities/${communityID}/overview`);
  } catch {}
};

const deleteIncidentAdmin = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const comunidad = Number(formData.get("comunidad"));
  const usuario = String(formData.get("usuario") ?? "").trim();
  const fecha = new Date(String(formData.get("fecha") ?? ""));

  if (!comunidad || isNaN(comunidad) || !usuario || isNaN(fecha.getTime())) return;

  try {
    await prisma.incidencia.delete({
      where: { comunidad_usuario_fecha: { comunidad, usuario, fecha } }
    });
    revalidatePath("/backoffice/incidencias");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { addIncident, deleteIncident, deleteIncidentAdmin };
export default updateIncidentStatus;
