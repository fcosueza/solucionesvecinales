"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Decision = "approve" | "reject";

/**
 * Validates whether a string is a valid decision (approve or reject).
 *
 * @param value El valor a validar
 * @returns true si el valor es "approve" o "reject"
 */
const isValidDecision = (value: string): value is Decision => {
  return value === "approve" || value === "reject";
};

/**
 * Review a community subscription request.
 * If approved, creates the user's enrollment in the community.
 * If rejected, updates the request status.
 * Only community administrators can do this.
 *
 * @param formData FormData that must contain: communityID, requestID and decision (approve/reject)
 */
const reviewCommunityRequest = async (formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  // Verify that the user is authenticated
  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const communityID = Number(formData.get("communityID"));
  const requestID = Number(formData.get("requestID"));
  const decisionValue = String(formData.get("decision") ?? "").trim();

  // Validate input data
  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !Number.isInteger(requestID) ||
    requestID <= 0 ||
    !isValidDecision(decisionValue)
  ) {
    return;
  }

  // Verify that the community exists
  const community = await prisma.community.findUnique({
    where: {
      id: communityID
    },
    select: {
      id: true,
      adminId: true
    }
  });

  // Verify that the user is the community admin
  if (!community || community.adminId !== verifiedSession.session.userID) {
    return;
  }

  // Determine the new status of the request
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
    const solicitud = await tx.request.findFirst({
      where: {
        id: requestID,
        community: communityID,
        status: "pending"
      },
      select: {
        user: true
      }
    });

    // If the request is not found or is not in pending status, we do nothing
    if (!solicitud) {
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

    // If no request was updated, we do nothing further
    if (updatedRequests.count === 0) {
      return;
    }

    // If the request was approved, create the registration
    if (nextStatus === "approved") {
      await tx.membership.upsert({
        where: {
          user_community: {
            user: solicitud.user,
            community: communityID
          }
        },
        update: {},
        create: {
          user: solicitud.user,
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
