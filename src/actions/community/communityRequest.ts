"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Create a new community subscription request for the authenticated user,
 * as long as there is no pending request or the user is not already subscribed to the community.
 *
 * @param formData Form data with the "communityID" field that indicates which community the user wants to subscribe to.
 */
const requestCommunitySubscription = async (formData: FormData): Promise<void> => {
  const sesionVerificada = await verifySession();

  // We check that the user is authenticated
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  // Administrators cannot submit requests from the search flow
  if (esAdministrador) {
    return;
  }

  const idComunidadTemp = formData.get("communityID");
  const idComunidad = Number(idComunidadTemp);

  // We validate that the communityID is a positive integer
  if (!Number.isInteger(idComunidad) || idComunidad <= 0) {
    return;
  }

  const idUsuario = sesionVerificada.session.userID;

  // We perform the necessary queries in parallel to optimize performance
  const [comunidad, comunidadesUsuario, solicitudesPendientes] = await Promise.all([
    prisma.comunidad.findUnique({
      where: {
        id: idComunidad
      },
      select: {
        id: true
      }
    }),
    prisma.usuario.findUnique({
      where: {
        id: idUsuario
      },
      select: {
        inscripciones: {
          where: {
            comunidad: idComunidad
          },
          select: {
            comunidad: true
          }
        }
      }
    }),
    prisma.solicitud.findFirst({
      where: {
        usuario: idUsuario,
        comunidad: idComunidad,
        estado: "pendiente"
      },
      select: {
        estado: true
      }
    })
  ]);

  // If the community does not exist, we do nothing
  if (!comunidad) {
    return;
  }

  const yaSubscrito = (comunidadesUsuario?.inscripciones.length ?? 0) > 0;

  // If the user is already subscribed to the community, we do nothing
  if (yaSubscrito) {
    return;
  }

  // If a pending request already exists, do nothing
  if (solicitudesPendientes) {
    return;
  }

  // If everything is valid, create the request in "pending" status
  await prisma.solicitud.create({
    data: {
      usuario: idUsuario,
      comunidad: idComunidad,
      estado: "pendiente"
    }
  });

  revalidatePath("/communities/search");
};

const deleteRequest = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.solicitud.delete({ where: { id } });
    revalidatePath("/backoffice/solicitudes");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { deleteRequest };
export default requestCommunitySubscription;
