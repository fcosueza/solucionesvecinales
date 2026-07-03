"use client";

import { contactMsg } from "@/actions/contactMsg";
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
 * Component that renders the contact form and processes the information using Server Actions.
 *
 * @returns The contact form as a React element.
 */
const ContactForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(contactMsg, estadoInicial);

  useEffect(() => {
    if (!state.message) return;

    if (state.state === "success") {
      toast.success(state.message);
      return;
    }

    toast.error(state.message);
  }, [state]);

  return (
    <>
      <form action={formAction} id="contactForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={state?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: state?.errors?.name ? "" : ((state.payload?.get("name") as string) ?? ""),
            placeholder: "Introduzca su nombre..."
          }}
        />

        <FormInput
          labelText="Correo"
          errorMsg={state?.errors?.email ?? ""}
          attr={{
            id: "email",
            name: "email",
            type: InputType.email,
            defaultValue: state?.errors?.email ? "" : ((state.payload?.get("email") as string) ?? ""),
            placeholder: "Introduzca su correo...",
            pattern: "[^@\\s]+@[^@\\s]+.[^@\\s]+",
            required: true
          }}
        />

        <FormInput
          labelText="Mensaje (mín. 20 caracteres)"
          errorMsg={state?.errors?.msg ?? ""}
          attr={{
            id: "msg",
            name: "msg",
            type: InputType.textarea,
            defaultValue: state?.errors?.msg ? "" : ((state.payload?.get("msg") as string) ?? ""),
            placeholder: "Introduzca su mensaje...",
            required: true
          }}
        />

        <Button type="submit" text="Enviar mensaje →" disabled={isPending} />
      </form>
    </>
  );
};

export default ContactForm;
