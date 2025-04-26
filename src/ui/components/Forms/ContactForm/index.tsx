"use client";

import addContactMsg from "@/actions/add-contact-msg";
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
const ContactForm = ({ action = addContactMsg }: Props): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<any, FormData>(action, initialState);

  return (
    <>
      <form action={formAction} id="contactForm" role="form" className={style.form}>
        <p className={style.form__msg} aria-live="polite">
          {state ? state.message : ""}
        </p>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="name" className={style.form__label}>
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={style.form__input}
            placeholder="Introduzca su nombre..."
          />
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
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder="Introduzca su correo.."
            required
          />
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="msg" className={style.form__label}>
            Mensaje (mín. 20 caracteres) <span title="Requerido">*</span>
          </label>
          <textarea
            name="msg"
            id="msg"
            rows={5}
            className={style.form__textarea}
            placeholder="Introduzca un mensaje..."
            minLength={20}
            required
          ></textarea>
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default ContactForm;
