"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Decision = "approve" | "reject";

const isValidDecision = (value: string): value is Decision => {
  return value === "approve" || value === "reject";
};

/**
 * Revisa una solicitud de comunidad. Si se aprueba, crea la inscripcion.
 */
const reviewCommunityRequest = async (formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const communityID = Number(formData.get("communityID"));
  const requestID = Number(formData.get("requestID"));
  const decisionValue = String(formData.get("decision") ?? "").trim();

  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !Number.isInteger(requestID) ||
    requestID <= 0 ||
    !isValidDecision(decisionValue)
  ) {
    return;
  }

  const community = await prisma.comunidad.findUnique({
    where: {
      id: communityID
    },
    select: {
      id: true,
      adminID: true
    }
  });

  if (!community || community.adminID !== verifiedSession.session.userID) {
    return;
  }

  const nextStatus = decisionValue === "approve" ? "aprobada" : "denegada";

  await prisma.$transaction(async tx => {
    const solicitudes = await tx.$queryRaw<Array<{ estado: "pendiente" | "aprobada" | "denegada"; usuario: string }>>`
      SELECT s."estado", s."usuario"
      FROM "Solicitud" s
      WHERE s."id" = ${requestID}
        AND s."comunidad" = ${communityID}
      LIMIT 1
    `;

    const solicitud = solicitudes[0];

    if (!solicitud || solicitud.estado !== "pendiente") {
      return;
    }

    await tx.$executeRaw`
      UPDATE "Solicitud"
      SET "estado" = ${nextStatus}
      WHERE "id" = ${requestID}
    `;

    if (nextStatus === "aprobada") {
      await tx.inscripcion.upsert({
        where: {
          usuario_comunidad: {
            usuario: solicitud.usuario,
            comunidad: communityID
          }
        },
        update: {},
        create: {
          usuario: solicitud.usuario,
          comunidad: communityID
        }
      });
    }
  });

  revalidatePath(`/communities/${communityID}/solicitudes`);
  revalidatePath("/communities");
  revalidatePath("/communities/search");
};

export default reviewCommunityRequest;
