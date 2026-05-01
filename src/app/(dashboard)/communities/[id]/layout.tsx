import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const CommunityLayout = async ({ children, params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const comunidadId = Number(id);

  if (isNaN(comunidadId)) {
    notFound();
  }

  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const comunidad = await prisma.comunidad.findUnique({
    where: { id: comunidadId },
    select: { id: true }
  });

  if (!comunidad) {
    notFound();
  }

  const inscripcion = await prisma.inscripcion.findUnique({
    where: {
      usuario_comunidad: {
        usuario: sesionVerificada.session.userID,
        comunidad: comunidadId
      }
    },
    select: {
      usuario: true
    }
  });

  if (!inscripcion) {
    redirect("/communities");
  }

  return children;
};

export default CommunityLayout;
