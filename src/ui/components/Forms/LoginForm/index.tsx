"use client";

import logIn from "@/actions/auth/logIn";
import { useActionState } from "react";
import { FormActionState } from "@/types/types";
import Button from "../../Button";
import style from "./style.module.css";

// Estado inicial del formulario
const initialState: FormActionState = {
  message: ""
};

/**
 * Componente ContactForm
 *
 * Componente que genera un formulario de contacto que permite a un usuario
 * crear un mensaje en la base de datos.
 *
 * @returns Nodo de React con el formulario de login.
 */

const LoginForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    logIn,
    initialState
  );

  return (
    <>
      <form action={formAction} id="loginForm" className={style.form} aria-label="login-form">
        <p>{state?.message}</p>
        <div aria-label="form-control" className={style.form__control}>
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
            defaultValue={state?.errors?.email ? "" : (state.payload?.get("email") as string) || ""}
            required
          />
          <p className={style.errorMsg}>{state?.errors?.email && "*" + state.errors.email}</p>
        </div>
        <div aria-label="form-control" className={style.form__control}>
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
            defaultValue={
              state?.errors?.password ? "" : (state.payload?.get("password") as string) || ""
            }
            required
          />
          <p className={style.errorMsg}>{state?.errors?.password && "*" + state.errors.password}</p>
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default LoginForm;
