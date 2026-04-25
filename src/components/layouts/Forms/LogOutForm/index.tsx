"use client";

import Button from "@/components/ui/Button";
import logOut from "@/actions/auth/logOut";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

/** Props del componente LogOutForm. */
interface Props {
  questionText?: string;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Componente que renderiza un formulario de confirmación para cerrar sesión.
 *
 * @param props - Props del componente LogOutForm.
 * @param props.questionText - Pregunta mostrada al usuario.
 * @param props.confirmText - Texto del botón de confirmación.
 * @param props.cancelText - Texto del botón de cancelación.
 *
 * @returns El formulario de confirmación de cierre de sesión como un elemento React.
 */
const LogOutForm = ({
  questionText = "You want to logout?",
  confirmText = "Yes",
  cancelText = "No"
}: Props): React.ReactNode => {
  const enrutador = useRouter();

  return (
    <>
      <form action={logOut} id="logOutFForm" role="form" className={style.form}>
        <h3 className={style.form__title}>{questionText}</h3>
        <div className={style.form__buttons}>
          <Button text={confirmText} type="submit" />
          <Button text={cancelText} type="button" onClick={() => enrutador.back()} />
        </div>
      </form>
    </>
  );
};

export default LogOutForm;
