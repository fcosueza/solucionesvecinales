"use client";

import Button from "../../Button";

interface Props {
  formAction?: string | ((formData: FormData) => void);
  onSubmit?: (Event: SubmitEvent) => void;
}

const ContactForm = ({ formAction = "submit" }: Props): React.ReactNode => {
  return (
    <form role="form" action={formAction}>
      <div role="form-control">
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div role="form-control">
        <label htmlFor="email">Correo:</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div role="form-control">
        <label htmlFor="msg">Mensaje:</label>
        <textarea name="msg" id="msg" required></textarea>
      </div>
      <Button type="submit" text="Enviar" />
    </form>
  );
};

export default ContactForm;
