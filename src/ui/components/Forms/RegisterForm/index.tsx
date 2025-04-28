"use client";

import addContactMsg from "@/actions/addContactMsg";
import { useActionState } from "react";
import Button from "../../Button";
import style from "./style.module.css";

const initialState = {
  message: "",
  errors: ""
};

interface Props {
  action?: (prevState: any, FormData: FormData) => void;
}

/**
 * Componente ContactForm
 *
 * Componente que genera un formulario de contacto que permite a un usuario
 * crear un mensaje en la base de datos.
 *
 * @param action Función de tipo Server Action que se encargará de procesas la solicitud del formulario.
 * @returns
 */

const RegisterForm = ({ action = addContactMsg }: Props): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<any, FormData>(action, initialState);

  return (
    <>
      <form action={formAction} id="contactForm" role="form" className={style.form}>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="email" className={style.form__label}>
            Correo <span title="Requerido">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={style.form__input}
            placeholder="Introduzca su correo.."
            required
          />
          <p className={style.errorMsg}>{state?.errors?.email && "*" + state.errors.email}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="password" className={style.form__label}>
            Contraseña <span title="Requerido">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={style.form__input}
            placeholder="Introduzca su contraseña..."
          />
          <p className={style.errorMsg}>{state?.errors?.name && "*" + state.errors.name}</p>
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default RegisterForm;
