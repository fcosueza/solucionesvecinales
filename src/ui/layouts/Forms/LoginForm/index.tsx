"use client";

import logIn from "@/actions/auth/logIn";
import FormError from "@/ui/components/FormFields/FormError";
import { useActionState } from "react";
import { FormActionState } from "@/types";
import Button from "../../../components/Button";
import style from "./style.module.css";

const initialState: FormActionState = {
  message: ""
};

const LoginForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    logIn,
    initialState
  );

  return (
    <>
      <form action={formAction} id="loginForm" className={style.form} aria-label="login-form">
        <div aria-label="form-control" className={style.form__control}>
          <label htmlFor="email" className={style.form__label}>
            Correo
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${style.form__input} ${state?.errors?.email ? style.inputError : ""}`}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder="Introduzca su correo.."
            defaultValue={state?.errors?.email ? "" : (state.payload?.get("email") as string) || ""}
            required
          />
          {state?.errors?.email && <FormError message={state.errors.email} />}
        </div>
        <div aria-label="form-control" className={style.form__control}>
          <label htmlFor="password" className={style.form__label}>
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`${style.form__input} ${state?.errors?.password ? style.inputError : ""}`}
            min="15"
            placeholder="Introduzca su contraseña..."
            defaultValue={
              state?.errors?.password ? "" : (state.payload?.get("password") as string) || ""
            }
            required
          />
          {state?.errors?.password && <FormError message={state.errors.password} />}
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default LoginForm;
