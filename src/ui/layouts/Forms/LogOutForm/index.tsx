"use client";

import Button from "@/ui/components/Button";
import logOutAction from "@/actions/auth/logOutAction";
import { useRouter } from "next/navigation";

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
      <form action={logOutAction} id="logOutFOrm" role="form">
        <h3>{questionText}</h3>
        <Button text={confirmText} type="submit" />
        <Button text={cancelText} type="button" onClick={() => enrutador.back()} />
      </form>
    </>
  );
};

export default LogOutForm;
