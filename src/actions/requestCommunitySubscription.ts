"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Crea una nueva solicitud de suscripcion en estado pendiente cuando no existe otra pendiente.
 */
const requestCommunitySubscription = async (formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const communityIDRaw = formData.get("communityID");
  const communityID = Number(communityIDRaw);

  if (!Number.isInteger(communityID) || communityID <= 0) {
    return;
  }

  const userID = verifiedSession.session.userID;

  const [community, userWithCommunities, existingPendingRequest] = await Promise.all([
    prisma.comunidad.findUnique({
      where: {
        id: communityID
      },
      select: {
        id: true
      }
    }),
    prisma.usuario.findUnique({
      where: {
        id: userID
      },
      select: {
        inscripciones: {
          where: {
            comunidad: communityID
          },
          select: {
            comunidad: true
          }
        }
      }
    }),
    prisma.solicitud.findFirst({
      where: {
        usuario: userID,
        comunidad: communityID,
        estado: "pendiente"
      },
      select: {
        estado: true
      }
    })
  ]);

  if (!community) {
    return;
  }

  const isAlreadySubscribed = (userWithCommunities?.inscripciones.length ?? 0) > 0;

  if (isAlreadySubscribed) {
    return;
  }

  if (existingPendingRequest) {
    return;
  }

  await prisma.solicitud.create({
    data: {
      usuario: userID,
      comunidad: communityID,
      estado: "pendiente"
    }
  });

  revalidatePath("/communities/search");
};

export default requestCommunitySubscription;
