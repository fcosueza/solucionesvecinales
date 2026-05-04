"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Decision = "approve" | "reject";

/**
 * Valida si un string es una decisión válida (approve o reject).
 *
 * @param value El valor a validar
 * @returns true si el valor es "approve" o "reject"
 */
const isValidDecision = (value: string): value is Decision => {
  return value === "approve" || value === "reject";
};

/**
 * Revisa una solicitud de suscripción a una comunidad.
 * Si se aprueba, crea la inscripción del usuario en la comunidad.
 * Si se rechaza, actualiza el estado de la solicitud.
 * Solo pueden hacerlo los administradores de la comunidad.
 *
 * @param formData FormData que debe contener: communityID, requestID y decision (approve/reject)
 */
const reviewCommunityRequest = async (formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  // Verifica que el usuario esté autenticado
  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const communityID = Number(formData.get("communityID"));
  const requestID = Number(formData.get("requestID"));
  const decisionValue = String(formData.get("decision") ?? "").trim();

  // Valida los datos de entrada
  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !Number.isInteger(requestID) ||
    requestID <= 0 ||
    !isValidDecision(decisionValue)
  ) {
    return;
  }

  // Verifica que la comunidad exista
  const community = await prisma.comunidad.findUnique({
    where: {
      id: communityID
    },
    select: {
      id: true,
      adminID: true
    }
  });

  // Verifica que el usuario sea el admin de la comunidad
  if (!community || community.adminID !== verifiedSession.session.userID) {
    return;
  }

  // Determina el nuevo estado de la solicitud
  const nextStatus = decisionValue === "approve" ? "aprobada" : "denegada";

  /*
   * En este caso, a diferencia de otras server actions, realizamos la operación con la base de datos
   * dentro de una transacción. Esto se debe a que necesitamos asegurarnos de que la actualización del estado
   * de la solicitud y la posible creación de la inscripción se realicen de manera individual.
   *
   * Si se aprueba la solicitud, primero actualizamos su estado a "aprobada" y luego creamos la inscripción correspondiente.
   * Si se deniega, solo actualizamos el estado a "denegada".
   *
   * Al usar una transacción, garantizamos que ambas operaciones se complete correctamente o que ninguna de ellas se aplique en caso de error.
   */
  await prisma.$transaction(async tx => {
    const solicitud = await tx.solicitud.findFirst({
      where: {
        id: requestID,
        comunidad: communityID,
        estado: "pendiente"
      },
      select: {
        usuario: true
      }
    });

    // Si no se encuentra la solicitud o no está en estado pendiente, no hacemos nada
    if (!solicitud) {
      return;
    }

    // Actualiza el estado de la solicitud
    const updatedRequests = await tx.solicitud.updateMany({
      where: {
        id: requestID,
        comunidad: communityID,
        estado: "pendiente"
      },
      data: {
        estado: nextStatus
      }
    });

    // Si no se actualizó ninguna solicitud, no hacemos nada más
    if (updatedRequests.count === 0) {
      return;
    }

    // Si la solicitud fue aprobada, crea la inscripción
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
