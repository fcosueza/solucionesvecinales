"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type IncidentState = "reportado" | "procesandose" | "resuelto";

const getNextState = (currentState: IncidentState): IncidentState => {
  if (currentState === "reportado") {
    return "procesandose";
  }

  if (currentState === "procesandose") {
    return "resuelto";
  }

  return "resuelto";
};

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

export { addIncident };
export default updateIncidentStatus;
