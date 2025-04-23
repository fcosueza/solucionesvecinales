"use client";

import React, { useState, FormEvent } from "react";
import Button from "../../Button";
import style from "./style.module.css";

const ContactForm = (): React.ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
    } catch (error) {
      setError(error.msg);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form id="contactForm" role="form" onSubmit={onSubmit} className={style.form}>
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
          <textarea
            name="msg"
            id="msg"
            rows={5}
            className={style.form__textarea}
            required
          ></textarea>
        </div>
        <Button type="submit" text="Enviar" disabled={isLoading} />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </>
  );
};

export default ContactForm;
