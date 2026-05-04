"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Server action que crea un registro financiero (ingreso o gasto) en una comunidad.
 * Solo puede ser ejecutada por administradores de la comunidad o webAdmin.
 * Valida los permisos y revalida las rutas de finanzas después de crear el registro.
 *
 * @param communityID - ID de la comunidad donde se registra el movimiento
 * @param formData - FormData que debe contener: descripcion, importe y tipo (ingreso/gasto)
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

/**
 * Server action que elimina un registro financiero. Solo puede ser ejecutada por webAdmin.
 * Revalida las rutas del backoffice de finanzas después de eliminar el registro.
 *
 * @param formData - FormData que debe contener el campo "id" del registro a eliminar
 */
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
