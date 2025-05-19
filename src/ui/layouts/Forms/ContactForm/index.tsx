"use client";

import contactMsgAction from "@/actions/contactMsgAction";
import { useActionState } from "react";
import { FormActionState } from "@/types";
import FormError from "@/ui/components/FormFields/FormError";
import Button from "../../../components/Button";
import style from "./style.module.css";

const initialState: FormActionState = {
  message: ""
};

const ContactForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    contactMsgAction,
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
          {state?.errors?.name && <FormError message={state.errors.name} />}
        </div>

        <div role="form-control" className={style.form__control}>
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

        <div role="form-control" className={style.form__control}>
          <label htmlFor="msg" className={style.form__label}>
            Mensaje (mín. 20 caracteres)
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
          {state?.errors?.msg && <FormError message={state.errors.msg} />}
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default ContactForm;
