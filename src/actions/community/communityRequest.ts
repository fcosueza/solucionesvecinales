"use server";

import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Crea una nueva solicitud de suscripción a una comunidad para el usuario autenticado,
 * siempre que no exista ya una solicitud pendiente o el usuario no esté ya suscrito a la comunidad.
 *
 * @param formData Datos del formulario con el campo "communityID" que indica a qué comunidad se quiere suscribir el usuario.
 */
const requestCommunitySubscription = async (formData: FormData): Promise<void> => {
  const sesionVerificada = await verifySession();

  // Comprobamos que el usuario está autenticado
  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    return;
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  // Los administradores no pueden enviar solicitudes desde el flujo de búsqueda
  if (esAdministrador) {
    return;
  }

  const idComunidadTemp = formData.get("communityID");
  const idComunidad = Number(idComunidadTemp);

  // Validamos que el communityID es un número entero positivo
  if (!Number.isInteger(idComunidad) || idComunidad <= 0) {
    return;
  }

  const idUsuario = sesionVerificada.session.userID;

  // Realizamos las consultas necesarias en paralelo para optimizar el rendimiento
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

  // Si la comunidad no existe, no hacemos nada
  if (!comunidad) {
    return;
  }

  const yaSubscrito = (comunidadesUsuario?.inscripciones.length ?? 0) > 0;

  // Si el usuario ya está suscrito a la comunidad, no hacemos nada
  if (yaSubscrito) {
    return;
  }

  // Si ya existe una solicitud pendiente, no hacemos nada
  if (solicitudesPendientes) {
    return;
  }

  // Si todo es correcto, creamos la solicitud en estado "pendiente"
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
