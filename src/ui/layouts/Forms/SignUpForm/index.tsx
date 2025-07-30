"use client";

import signUpAction from "@/actions/auth/signUpAction";
import { useActionState } from "react";
import { FormActionState } from "@/types";
import Button from "../../../components/Button";
import style from "./style.module.css";

const initialState = {
  state: "error" as const,
  message: ""
};

const SignUpForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(signUpAction, initialState);

  return (
    <>
      <form action={formAction} id="signupForm" role="form" className={style.form}>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="name" className={style.form__label}>
            Nombre <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={style.form__input}
            defaultValue={state?.errors?.name ? "" : (state.payload?.get("name") as string) || ""}
            placeholder="Introduzca su nombre..."
            aria-label="name-input"
            required
          />
          <p role="alert" className={style.errorMsg}>
            {state?.errors?.name && "*" + state.errors.name}
          </p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="surname" className={style.form__label}>
            Apellidos <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            className={style.form__input}
            defaultValue={state?.errors?.surname ? "" : (state.payload?.get("surname") as string) || ""}
            placeholder="Introduzca sus apellidos..."
            aria-label="surname-input"
            required
          />
          <p role="alert" className={style.errorMsg}>
            {state?.errors?.surname && "*" + state.errors.surname}
          </p>
        </div>
        <div className={style.form__control}>
          <fieldset className={style.form__fieldset} role="radiogroup">
            <legend className={style.form__label}>
              Selecciona el rol de tu usuario: <span title="Requerido">*</span>
            </legend>
            <div className={style.form__controlRadio}>
              <input
                type="radio"
                id="tenant"
                name="role"
                value="tenant"
                className={style.form__radio}
                aria-label="tenant-radio"
                defaultChecked
              />
              <label htmlFor="tenant">inquilino</label>
            </div>
            <div className={style.form__controlRadio}>
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                aria-label="admin-radio"
                className={style.form__radio}
              />
              <label htmlFor="admin">administrador</label>
            </div>
          </fieldset>
        </div>

        <div role="form-control" className={style.form__control}>
          <label htmlFor="email" className={style.form__label}>
            Correo <span title="Requerido">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={style.form__input}
            placeholder="Introduzca su correo..."
            defaultValue={state?.errors?.email ? "" : (state.payload?.get("email") as string) || ""}
            aria-label="email-input"
            required
          />
          <p role="alert" className={style.errorMsg}>
            {state?.errors?.email && "*" + state.errors.email}
          </p>
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
            defaultValue={state?.errors?.password ? "" : (state.payload?.get("password") as string) || ""}
            placeholder="Introduzca su contraseña..."
            aria-label="password-input"
          />
          <p role="alert" className={style.errorMsg}>
            {state?.errors?.password && "*" + state.errors.password}
          </p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="repeat" className={style.form__label}>
            Repite la Contraseña (15 caracteres min.) <span title="Requerido">*</span>
          </label>
          <input
            type="password"
            name="repeat"
            id="repeat"
            className={style.form__input}
            defaultValue={state?.errors?.repeat ? "" : (state.payload?.get("repeat") as string) || ""}
            aria-label="repeat-input"
            placeholder="Introduzca su contraseña..."
          />
          <p role="alert" className={style.errorMsg}>
            {state?.errors?.repeat && "*" + state.errors.repeat}
          </p>
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default SignUpForm;
