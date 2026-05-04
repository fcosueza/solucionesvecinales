"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

const communityFinance = async (communityID: number, formData: FormData): Promise<void> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    return;
  }

  const isAdmin = verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  if (!isAdmin) {
    return;
  }

  const inscription = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: verifiedSession.session.userID,
        comunidad: communityID
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscription) {
    return;
  }

  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const importe = Number(formData.get("importe"));
  const tipo = String(formData.get("tipo") ?? "").trim();

  if (
    !Number.isInteger(communityID) ||
    communityID <= 0 ||
    !descripcion ||
    !Number.isFinite(importe) ||
    importe <= 0 ||
    (tipo !== "ingreso" && tipo !== "gasto")
  ) {
    return;
  }

  try {
    await prisma.registro.create({
      data: {
        comunidad: communityID,
        descripcion,
        importe,
        tipo
      }
    });

    revalidatePath(`/communities/${communityID}/finanzas`);
    revalidatePath(`/communities/${communityID}/overview`);
  } catch {}
};

const deleteRecord = async (formData: FormData): Promise<void> => {
  const session = await verifySession();

  if (!session.isAuth || session.session?.role !== UserRole.webAdmin) return;

  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  try {
    await prisma.registro.delete({ where: { id } });
    revalidatePath("/backoffice/finanzas");
    revalidatePath("/backoffice/overview");
  } catch {}
};

export { communityFinance, deleteRecord };
