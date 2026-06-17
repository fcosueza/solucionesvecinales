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

  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const importe = Number(formData.get("importe"));
  const tipo = String(formData.get("tipo") ?? "").trim();
  const recordType = tipo === "ingreso" ? "income" : tipo === "gasto" ? "expense" : null;

  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !descripcion ||
    !Number.isFinite(importe) ||
    importe <= 0 ||
    !recordType
  ) {
    return;
  }

  try {
    await prisma.financialRecord.create({
      data: {
        community: communityID,
        description: descripcion,
        amount: importe,
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
