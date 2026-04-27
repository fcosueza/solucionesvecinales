import CommunityAddForm from "@/components/layouts/Forms/CommunityAddForm";
import Header from "@/components/layouts/Header";
import ScrollToTopOnMount from "@/components/ui/ScrollToTopOnMount";
import verifySession from "@/lib/dal";
import { NavItem, UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const enlacesCabecera: NavItem[] = [
  { text: "Resumen", href: "/overview" },
  { text: "Cerrar sesión", href: "/logout" }
];

const NewCommunity = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdministrador) {
    redirect("/overview");
  }

  return (
    <>
      <ScrollToTopOnMount />
      <Header links={enlacesCabecera} />
      <main className={style.main}>
        <h2 className={style.title}>Añadir comunidad</h2>
        <CommunityAddForm />
      </main>
    </>
  );
};

export default NewCommunity;
