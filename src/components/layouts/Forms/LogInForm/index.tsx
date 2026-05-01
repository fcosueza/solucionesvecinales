"use client";

import logIn from "@/actions/auth/logIn";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FormActionState, InputType } from "@/types";
import FormInput from "@/components/ui/FormComp/FormInput";
import Button from "../../../ui/Button";
import { toast } from "sonner";
import Image from "next/image";
import style from "./style.module.css";

const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Componente que renderiza el formulario de inicio de sesión y procesa credenciales.
 *
 * @param props - Props del componente LogInForm.
 *
 * @returns El formulario de inicio de sesión como un elemento React.
 */
const LogInForm = (): React.ReactNode => {
  const router = useRouter();
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(logIn, estadoInicial);

  useEffect(() => {
    if (!estado.message) return;

    if (estado.state === "success") {
      toast.success(estado.message);
      router.push("/overview");
      return;
    }

    toast.error(estado.message);
  }, [estado, router]);

  return (
    <>
      <form action={accionFormulario} id="loginForm" className={style.form} role="form">
        <div className={style.form__header}>
          <div className={style.form__avatar}>
            <Image src="/assets/icons/profile-100.png" alt="Profile icon" width={80} height={80} />
          </div>
          <h2 className={style.form__title}>Inicia sesión</h2>
          <p className={style.form__subtitle}>Accede a tu cuenta para continuar</p>
        </div>

        <FormInput
          labelText="Correo"
          errorMsg={estado?.errors?.email ?? ""}
          attr={{
            id: "email",
            name: "email",
            type: InputType.email,
            defaultValue: (estado.payload?.get("email") as string) ?? "",
            placeholder: "Introduzca su correo...",
            pattern: "[^@\\s]+@[^@\\s]+.[^@\\s]+",
            required: true
          }}
        />

        <FormInput
          labelText="Contraseña"
          errorMsg={estado?.errors?.password ?? ""}
          attr={{
            id: "password",
            name: "password",
            type: InputType.password,
            placeholder: "Introduzca su contraseña...",
            defaultValue: "",
            required: true
          }}
        />

        <Button type="submit" text="Enviar" disabled={estaPendiente} fullWidth />
      </form>
    </>
  );
};

export default LogInForm;
