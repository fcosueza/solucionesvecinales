import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import LogOutForm from "@/components/layouts/Forms/LogOutForm";
import style from "./style.module.css";

export default function LogOut() {
  return (
    <>
      <Header links={[{ text: "Inicio", href: "/" }]} />
      <main className={style.main}>
        <LogOutForm
          questionText="¿Quieres cerrar sesión?"
          confirmText="Sí, salir"
          cancelText="No, volver"
        />
      </main>
      <Footer />
    </>
  );
}
