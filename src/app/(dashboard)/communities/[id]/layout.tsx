import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

/**
 * Community layout component.
 *
 * Wraps all community-related pages and ensures that the user is authenticated and authorized to access the community.
 *
 * @param children Content of nested community pages
 * @param params Route parameters including community ID
 *
 * @returns The community layout rendered
 */
const CommunityLayout = async ({ children, params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const communityID = Number(id);

  if (isNaN(communityID)) {
    notFound();
  }

  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const community = await prisma.community.findUnique({
    where: { id: communityID },
    select: { id: true }
  });

  if (!community) {
    notFound();
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
    redirect("/communities");
  }

  return children;
};

export default CommunityLayout;
