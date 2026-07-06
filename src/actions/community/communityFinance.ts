"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Server action that creates a financial record (income or expense) in a community.
 * It can only be run by community administrators or webAdmin.
 * Validates permissions and revalidates finance routes after creating the record.
 *
 * @param communityID - ID of the community where the movement is registered
 * @param formData - FormData that must contain: description, amount and type (income/expense)
 *
 * @returns Promise<void> - Resolves when the record is created or if the user is not authorized
 */
const communityFinance = async (communityID: number, formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return;
  }

  const membership = await prisma.membership.findUnique({
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

  if (!membership) {
    return;
  }

  const description = String(formData.get("descripcion") ?? "").trim();
  const amount = Number(formData.get("importe"));
  const type = String(formData.get("tipo") ?? "").trim();
  const recordType = type === "ingreso" ? "income" : type === "gasto" ? "expense" : null;

  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !description ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !recordType
  ) {
    return;
  }

  try {
    await prisma.financialRecord.create({
      data: {
        community: communityID,
        description: description,
        amount: amount,
        type: recordType
      }
    });

    revalidatePath(`/communities/${communityID}/finanzas`);
    revalidatePath(`/communities/${communityID}/overview`);
  } catch {}
};

/**
 * Server action that deletes a financial record. It can only be run by webAdmin.
 * Revalidate finance backoffice routes after deleting the record.
 *
 * @param formData - FormData that must contain the "id" field of the record to be deleted
 */
const deleteRecord = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.financialRecord.delete({ where: { id } });
    revalidatePath("/backoffice/finanzas");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { communityFinance, deleteRecord };
