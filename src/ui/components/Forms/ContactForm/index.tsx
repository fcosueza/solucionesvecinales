"use client";

import addContactMsg from "@/actions/addContactMsg";
import { useActionState } from "react";
import { FormActionState } from "@/types";
import Button from "../../Button";
import style from "./style.module.css";

const initialState: FormActionState = {
  message: ""
};

const ContactForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    addContactMsg,
    initialState
  );

  return (
    <>
      <form action={formAction} id="contactForm" role="form" className={style.form}>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="name" className={style.form__label}>
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${style.form__input} ${state?.errors?.name ? style.inputError : ""}`}
            placeholder="Introduzca su nombre..."
            defaultValue={state?.errors?.name ? "" : (state.payload?.get("name") as string) || ""}
          />
          {state?.errors?.name && (
            <p role="alert" aria-live="assertive" className={style.errorMsg}>
              {"*" + state.errors.name}
            </p>
          )}
        </div>

        <div role="form-control" className={style.form__control}>
          <label htmlFor="email" className={style.form__label}>
            Correo <span title="Requerido">*</span>
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
          {state?.errors?.email && (
            <p role="alert" aria-live="assertive" className={style.errorMsg}>
              {"*" + state.errors.email}
            </p>
          )}
        </div>

        <div role="form-control" className={style.form__control}>
          <label htmlFor="msg" className={style.form__label}>
            Mensaje (mín. 20 caracteres) <span title="Requerido">*</span>
          </label>
          <textarea
            name="msg"
            id="msg"
            rows={5}
            className={`${style.form__textarea} ${state?.errors?.msg ? style.inputError : ""}`}
            placeholder="Introduzca un mensaje..."
            defaultValue={state?.errors?.msg ? "" : (state.payload?.get("msg") as string) || ""}
            aria-invalid="true"
            aria-errormessage="msgError"
            required
          ></textarea>
          {state?.errors?.msg && (
            <p role="alert" aria-live="assertive" className={style.errorMsg}>
              {"*" + state.errors.msg}
            </p>
          )}
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default ContactForm;
