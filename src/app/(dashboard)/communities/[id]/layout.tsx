import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

/**
 * Design of a specific community.
 * Verifies that the user has access to the community and provides the common structure
 * to all the pages of that community.
 *
 * @component
 * @param children Content of nested community pages
 * @param params Route parameters including community ID
 * @returns El community layout rendered
 */
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

  const comunidad = await prisma.community.findUnique({
    where: { id: comunidadId },
    select: { id: true }
  });

  if (!comunidad) {
    notFound();
  }

  const inscripcion = await prisma.membership.findUnique({
    where: {
      user_community: {
        user: sesionVerificada.session.userID,
        community: comunidadId
      }
    },
    select: {
      user: true
    }
  });

  if (!inscripcion) {
    redirect("/communities");
  }

  return children;
};

export default CommunityLayout;
