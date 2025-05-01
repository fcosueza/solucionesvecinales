"use client";

import signUp from "@/actions/auth/signUp";
import { useActionState } from "react";
import { FormActionState } from "@/types/types";
import Button from "../../Button";
import style from "./style.module.css";

const initialState = {
  message: ""
};

/**
 * Componente SignUpForm
 *
 * Componente que genera un formulario de registro que permite a un usuario
 * registrarse en el sistema con sus datos.
 *
 * @return Nodo de React con el formulario de login.
 */

const SignUpForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    signUp,
    initialState
  );

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
            Contraseña (15 caracteres min.) <span title="Requerido">*</span>
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
        <div role="form-control" className={style.form__control}>
          <label htmlFor="password" className={style.form__label}>
            Repite la Contraseña (15 caracteres min.) <span title="Requerido">*</span>
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

export default SignUpForm;
