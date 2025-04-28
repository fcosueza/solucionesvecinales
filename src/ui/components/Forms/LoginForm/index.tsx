"use client";

import logIn from "@/actions/auth/logIn";
import { useActionState } from "react";
import Button from "../../Button";
import style from "./style.module.css";

const initialState = {
  message: "",
  errors: ""
};

interface Props {
  action?: (prevState: any, formData: FormData) => void;
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

const LoginForm = ({ action = logIn }: Props): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<any, FormData>(action, initialState);

  return (
    <>
      <form action={formAction} id="loginForm" className={style.form}>
        <p>{state?.message}</p>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="email" className={style.form__label}>
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={style.form__input}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder="Introduzca su correo.."
            required
          />
          <p className={style.errorMsg}>{state?.errors?.email && "*" + state.errors.email}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="password" className={style.form__label}>
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={style.form__input}
            min="15"
            placeholder="Introduzca su contraseña..."
          />
          <p className={style.errorMsg}>{state?.errors?.password && "*" + state.errors.password}</p>
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default LoginForm;
