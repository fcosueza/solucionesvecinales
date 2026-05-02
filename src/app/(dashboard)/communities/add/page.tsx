import CommunityAddForm from "@/components/layouts/Forms/CommunityAddForm";
import ScrollToTopOnMount from "@/components/ui/ScrollToTop";
import verifySession from "@/lib/dal";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const NewCommunity = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const esAdministrador =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  if (!esAdministrador) {
    redirect("/communities");
  }

  return (
    <>
      <ScrollToTopOnMount />
      <main className={style.main}>
        <h2 className={style.title}>Añadir comunidad</h2>
        <CommunityAddForm />
      </main>
    </>
  );
};

export default NewCommunity;
