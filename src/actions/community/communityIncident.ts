"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/types";

type IncidentState = "reported" | "inProgress" | "resolved";

/**
 * Gets the next status in the progression of an issue.
 * The progression is: reported -> processing -> resolved
 *
 * @param currentState Current incident status
 * @returns Next status in the sequence
 */
const getNextState = (currentState: IncidentState): IncidentState => {
  if (currentState === "reported") {
    return "inProgress";
  }

  if (currentState === "inProgress") {
    return "resolved";
  }

  return "resolved";
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

  const inscription = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: verifiedSession.session.userID,
        community: communityID
      }
    },
    select: {
      user: true
    }
  });

  if (!inscription) {
    return;
  }

  const incident = await prisma.incident.findFirst({
    where: {
      community: communityID,
      user: userID,
      date: incidentDate
    },
    select: {
      status: true
    }
  });

  if (!incident || incident.status === "resolved") {
    return;
  }

  const nextState = getNextState(incident.status as IncidentState);

  await prisma.incident.updateMany({
    where: {
      community: communityID,
      user: userID,
      date: incidentDate,
      status: incident.status
    },
    data: {
      status: nextState,
      updatedAt: new Date()
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

  const inscription = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: verifiedSession.session.userID,
        community: communityID
      }
    },
    select: {
      user: true
    }
  });

  if (!inscription) {
    return;
  }

  const incident = await prisma.incident.findFirst({
    where: {
      community: communityID,
      user: userID,
      date: incidentDate
    },
    select: {
      status: true
    }
  });

  if (!incident || incident.status !== "resolved") {
    return;
  }

  try {
    await prisma.incident.delete({
      where: {
        community_user_date: {
          community: communityID,
          user: userID,
          date: incidentDate
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

  const inscription = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: verifiedSession.session.userID,
        community: communityID
      }
    },
    select: {
      user: true
    }
  });

  if (!inscription) {
    return;
  }

  try {
    await prisma.incident.create({
      data: {
        community: communityID,
        user: verifiedSession.session.userID,
        title,
        description,
        status: "reported"
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
    await prisma.incident.delete({
      where: { community_user_date: { community: comunidad, user: usuario, date: fecha } }
    });
    revalidatePath("/backoffice/incidencias");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { addIncident, deleteIncident, deleteIncidentAdmin };
export default updateIncidentStatus;
