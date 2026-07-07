import SideMenu from "@/components/layouts/SideMenu";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

/**
 * User dashboard design.
 *
 * Provides the common structure for all authenticated dashboard pages.
 * Verifies the user's session and displays a side menu with navigation options.
 * Redirect to login if the user is not authenticated.
 *
 * @param children Content of nested dashboard pages
 * @returns The rendered dashboard layout
 */
export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: verifiedSession.session.userID
    },
    select: {
      name: true,
      lastName: true,
      role: true,
      image: true
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={style.layoutWrapper}>
      <SideMenu
        userName={`${user.name} ${user.lastName}`}
        role={user.role as UserRole}
        avatarUrl={user.image ?? undefined}
      />
      <div className={style.contentArea}>{children}</div>
    </div>
  );
}
