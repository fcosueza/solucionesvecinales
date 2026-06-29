"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Decision = "approve" | "reject";

const isValidDecision = (value: string): value is Decision => {
  return value === "approve" || value === "reject";
};

/**
 * Reviews a pending community subscription request and approves or rejects it.
 *
 * @param formData Form data containing communityID, requestID and decision
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

  const community = await prisma.community.findUnique({
    where: {
      id: communityID
    },
    select: {
      id: true,
      adminId: true
    }
  });

  if (!community || community.adminId !== verifiedSession.session.userID) {
    return;
  }

  const nextStatus = decisionValue === "approve" ? "approved" : "rejected";

  /*
   * In this case, unlike other server actions, we perform the operation with the database
   * within a transaction. This is because we need to ensure that the status update
   * of the application and the possible creation of the registration are carried out individually.
   *
   * If the request is approved, we first update its status to "approved" and then create the corresponding enrollment.
   * If it is rejected, we only update the status to "denied".
   *
   * By using a transaction, we guarantee that both operations complete correctly or that neither is applied in case of error.
   */
  await prisma.$transaction(async tx => {
    const communityRequest = await tx.request.findFirst({
      where: {
        id: requestID,
        community: communityID,
        status: "pending"
      },
      select: {
        user: true
      }
    });

    if (!communityRequest) {
      return;
    }

    // Update request status
    const updatedRequests = await tx.request.updateMany({
      where: {
        id: requestID,
        community: communityID,
        status: "pending"
      },
      data: {
        status: nextStatus
      }
    });

    if (updatedRequests.count === 0) {
      return;
    }

    if (nextStatus === "approved") {
      await tx.membership.upsert({
        where: {
          user_community: {
            user: communityRequest.user,
            community: communityID
          }
        },
        update: {},
        create: {
          user: communityRequest.user,
          community: communityID
        }
      });
    }
  });

  revalidatePath(`/communities/${communityID}/solicitudes`);
  revalidatePath("/communities");
  revalidatePath("/communities/search");
};

export default reviewCommunityRequest;
