"use client";

import signUpAction from "@/actions/auth/signUpAction";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { FormActionState, InputType, RadioBoxType, UserRole } from "@/types";
import FormInput from "@/ui/components/FormComp/FormInput";
import FormRadioBox from "@/ui/components/FormComp/FormRadioBox";
import Button from "../../../components/Button";
import style from "./style.module.css";

const estadoInicial = {
  state: "error" as const,
  message: ""
};

/**
 * Componente que renderiza el formulario de registro y gestiona la creación de usuarios.
 *
 * @returns El formulario de registro como un elemento React.
 */
const SignUpForm = (): React.ReactNode => {
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    signUpAction,
    estadoInicial
  );

  // Si el usuario se crea correctamente, redirige a la página de login.
  if (estado.state == "success") redirect("/login");

  return (
    <>
      <form action={accionFormulario} id="signupForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={estado?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: estado?.errors?.name ? "" : ((estado.payload?.get("name") as string) ?? ""),
            placeholder: "Introduzca su nombre...",
            required: true
          }}
        />

        <FormInput
          labelText="Apellidos"
          errorMsg={estado?.errors?.surname ?? ""}
          attr={{
            id: "surname",
            name: "surname",
            type: InputType.text,
            defaultValue: estado?.errors?.surname ? "" : ((estado.payload?.get("surname") as string) ?? ""),
            placeholder: "Introduzca sus apellidos...",
            required: true
          }}
        />

        <FormRadioBox
          legend="Selecciona el rol de tu usuario"
          type={RadioBoxType.radio}
          name="role"
          elementList={[
            {
              labelText: "inquilino",
              radioAttr: {
                id: "tenant",
                value: UserRole.tenant,
                defaultChecked: true
              }
            },
            {
              labelText: "administrador",
              radioAttr: {
                id: "admin",
                value: UserRole.admin
              }
            }
          ]}
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
          labelText="Contraseña (min. 15 caracteres)"
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

        <FormInput
          labelText="Repita la Contraseña"
          errorMsg={estado?.errors?.repeat ?? ""}
          attr={{
            id: "repeat",
            name: "repeat",
            type: InputType.password,
            placeholder: "Repita la contraseña...",
            defaultValue: "",
            required: true
          }}
        />

        <Button type="submit" text="Enviar" disabled={estaPendiente} />
      </form>
    </>
  );
};

export default SignUpForm;
