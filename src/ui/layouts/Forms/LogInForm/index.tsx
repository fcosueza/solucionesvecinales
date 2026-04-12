"use client";

import logInAction from "@/actions/auth/logInAction";
import { useActionState } from "react";
import { FormActionState, InputType } from "@/types";
import FormInput from "@/ui/components/FormComp/FormInput";
import Button from "../../../components/Button";
import style from "./style.module.css";

const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Componente que renderiza el formulario de inicio de sesión y procesa credenciales.
 *
 * @returns El formulario de inicio de sesión como un elemento React.
 */
const LogInForm = (): React.ReactNode => {
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    logInAction,
    estadoInicial
  );

  return (
    <>
      <form action={accionFormulario} id="loginForm" className={style.form} role="form">
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

        <Button type="submit" text="Enviar" disabled={estaPendiente} />
      </form>
    </>
  );
};

export default LogInForm;
