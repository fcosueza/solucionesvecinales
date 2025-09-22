"use client";

import signUpAction from "@/actions/auth/signUpAction";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { FormActionState, InputType, RadioBoxType, UserRole } from "@/types";
import FormInput from "@/ui/components/FormComp/FormInput";
import FormRadioBox from "@/ui/components/FormComp/FormRadioBox";
import Button from "../../../components/Button";
import style from "./style.module.css";

const initialState = {
  state: "error" as const,
  message: ""
};

const SignUpForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(signUpAction, initialState);

  // If user is created we redirect to login page
  if (state.state == "success") redirect("/login");

  return (
    <>
      <form action={formAction} id="signupForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={state?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: state?.errors?.name ? "" : ((state.payload?.get("name") as string) ?? ""),
            placeholder: "Introduzca su nombre...",
            required: true
          }}
        />

        <FormInput
          labelText="Apellidos"
          errorMsg={state?.errors?.surname ?? ""}
          attr={{
            id: "surname",
            name: "surname",
            type: InputType.text,
            defaultValue: state?.errors?.surname ? "" : ((state.payload?.get("surname") as string) ?? ""),
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
          labelText="Contraseña (min. 15 caracteres)"
          errorMsg={state?.errors?.password ?? ""}
          attr={{
            id: "password",
            name: "password",
            type: InputType.password,
            placeholder: "Introduzca su contraseña...",
            defaultValue: state?.errors?.password ? "" : ((state.payload?.get("password") as string) ?? ""),
            required: true
          }}
        />

        <FormInput
          labelText="Repita la Contraseña"
          errorMsg={state?.errors?.repeat ?? ""}
          attr={{
            id: "repeat",
            name: "repeat",
            type: InputType.password,
            placeholder: "Repita la contraseña...",
            defaultValue: state?.errors?.repeat ? "" : ((state.payload?.get("repeat") as string) ?? ""),
            required: true
          }}
        />

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default SignUpForm;
