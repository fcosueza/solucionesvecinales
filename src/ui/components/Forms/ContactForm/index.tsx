"use client";

import Button from "../../Button";
import style from "./style.module.css";

interface Props {
  formAction?: string | ((formData: FormData) => void);
  method?: string;
}

const ContactForm = ({ formAction = "submit", method = "GET" }: Props): React.ReactNode => {
  return (
    <form role="form" action={formAction} method={method} className={style.form}>
      <div role="form-control" className={style.form__control}>
        <label htmlFor="name" className={style.form__label}>
          Nombre:
        </label>
        <input type="text" name="name" id="name" className={style.form__input} />
      </div>
      <div role="form-control" className={style.form__control}>
        <label htmlFor="email" className={style.form__label}>
          Correo:
        </label>
        <input type="email" name="email" id="email" className={style.form__input} required />
      </div>
      <div role="form-control" className={style.form__control}>
        <label htmlFor="msg" className={style.form__label}>
          Mensaje:
        </label>
        <textarea name="msg" id="msg" rows={5} className={style.form__textarea} required></textarea>
      </div>
      <Button type="submit" text="Enviar" />
    </form>
  );
};

export default ContactForm;
