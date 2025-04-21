"use client";

import Button from "../../Button";

const ContactForm = () => {
  return (
    <form action="submit">
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="email">Correo:</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="msg">Correo:</label>
        <textarea name="msg" id="msg"></textarea>
      </div>
      <Button type="submit" text="Enviar" />
    </form>
  );
};

export default ContactForm;
