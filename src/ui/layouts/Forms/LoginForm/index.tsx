"use client";

import logInAction from "@/actions/auth/logInAction";
import { useActionState } from "react";
import { FormActionState, InputType } from "@/types";
import FormInput from "@/ui/components/FormComp/FormInput";
import Button from "../../../components/Button";
import style from "./style.module.css";

const initialState: FormActionState = {
  state: "error" as const,
  message: ""
};

const LoginForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(logInAction, initialState);

  return (
    <>
      <form action={formAction} id="loginForm" className={style.form} role="form">
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
          labelText="Contraseña"
          errorMsg={state?.errors?.password ?? ""}
          attr={{
            id: "password",
            name: "password",
            type: InputType.text,
            placeholder: "Introduzca su contraseña...",
            defaultValue: state?.errors?.password ? "" : ((state.payload?.get("password") as string) ?? "")
          }}
        />

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default LoginForm;
