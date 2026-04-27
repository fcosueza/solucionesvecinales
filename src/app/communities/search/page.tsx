import CommunitySearchForm from "@/components/layouts/Forms/CommunitySearchForm";
import Header from "@/components/layouts/Header";
import ScrollToTopOnMount from "@/components/ui/ScrollToTopOnMount";
import prisma from "@/lib/prisma";
import verifySession from "@/lib/dal";
import { NavItem } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const headerLinks: NavItem[] = [
  { text: "Resumen", href: "/overview" },
  { text: "Cerrar sesion", href: "/logout" }
];

const SearchCommunityPage = async (): Promise<React.ReactNode> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const communities = await prisma.comunidad.findMany({
    select: {
      id: true,
      nombre: true,
      calle: true,
      numero: true,
      ciudad: true,
      provincia: true,
      pais: true
    },
    orderBy: {
      nombre: "asc"
    }
  });

  return (
    <>
      <ScrollToTopOnMount />
      <Header links={headerLinks} />
      <main className={style.main}>
        <h2 className={style.title}>Buscar comunidad</h2>
        <CommunitySearchForm communities={communities} />
      </main>
    </>
  );
};

export default SearchCommunityPage;
