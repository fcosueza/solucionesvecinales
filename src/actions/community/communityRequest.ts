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
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (isAdmin) {
    return;
  }

  const idCommunityTemp = formData.get("communityID");
  const idCommunity = Number(idCommunityTemp);

  // We validate that the communityID is a positive integer
  if (!Number.isInteger(idCommunity) || idCommunity <= 0) {
    return;
  }

  const userID = verifiedSession.session.userID;

  // We perform the necessary queries in parallel to optimize performance
  const [community, userCommunities, pendingRequests] = await Promise.all([
    prisma.community.findUnique({
      where: {
        id: idCommunity
      },
      select: {
        id: true
      }
    }),
    prisma.user.findUnique({
      where: {
        id: userID
      },
      select: {
        memberships: {
          where: {
            community: idCommunity
          },
          select: {
            community: true
          }
        }
      }
    }),
    prisma.request.findFirst({
      where: {
        user: userID,
        community: idCommunity,
        status: "pending"
      },
      select: {
        status: true
      }
    })
  ]);

  // If the community does not exist, we do nothing
  if (!community) {
    return;
  }

  const alreadySubscribed = (userCommunities?.memberships.length ?? 0) > 0;

  // If the user is already subscribed to the community, we do nothing
  if (alreadySubscribed) {
    return;
  }

  // If a pending request already exists, do nothing
  if (pendingRequests) {
    return;
  }

  // If everything is valid, create the request in "pending" status
  await prisma.request.create({
    data: {
      user: userID,
      community: idCommunity,
      status: "pending"
    }
  });

  revalidatePath("/communities/search");
};

/**
 * Deletes a community subscription request from backoffice.
 * Only available to web administrators.
 *
 * @param formData Form data containing the request id
 */
const deleteRequest = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.request.delete({ where: { id } });

    revalidatePath("/backoffice/solicitudes");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { deleteRequest, requestCommunitySubscription };
