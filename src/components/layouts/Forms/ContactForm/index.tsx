"use client";

import contactMsg from "@/actions/contactMsg";
import { useActionState, useEffect } from "react";
import { FormActionState, InputType } from "@/types";
import FormInput from "@/components/ui/FormComp/FormInput";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import style from "./style.module.css";

const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Componente que renderiza el formulario de contacto y procesa la información usando Server Actions.
 *
 * @param props - Props del componente ContactForm.
 * @returns El formulario de contacto como un elemento React.
 */
const ContactForm = (): React.ReactNode => {
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    contactMsg,
    estadoInicial
  );

  useEffect(() => {
    if (!estado.message) return;

    if (estado.state === "success") {
      toast.success(estado.message);
      return;
    }

    toast.error(estado.message);
  }, [estado]);

  return (
    <>
      <form action={accionFormulario} id="contactForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={estado?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: estado?.errors?.name ? "" : ((estado.payload?.get("name") as string) ?? ""),
            placeholder: "Introduzca su nombre..."
          }}
        />

        <FormInput
          labelText="Correo"
          errorMsg={estado?.errors?.email ?? ""}
          attr={{
            id: "email",
            name: "email",
            type: InputType.email,
            defaultValue: estado?.errors?.email ? "" : ((estado.payload?.get("email") as string) ?? ""),
            placeholder: "Introduzca su correo...",
            pattern: "[^@\\s]+@[^@\\s]+.[^@\\s]+",
            required: true
          }}
        />

        <FormInput
          labelText="Mensaje (mín. 20 caracteres)"
          errorMsg={estado?.errors?.msg ?? ""}
          attr={{
            id: "msg",
            name: "msg",
            type: InputType.textarea,
            defaultValue: estado?.errors?.msg ? "" : ((estado.payload?.get("msg") as string) ?? ""),
            placeholder: "Introduzca su mensaje...",
            required: true
          }}
        />

        <Button type="submit" text="Enviar" disabled={estaPendiente} />
      </form>
    </>
  );
};

export default ContactForm;
