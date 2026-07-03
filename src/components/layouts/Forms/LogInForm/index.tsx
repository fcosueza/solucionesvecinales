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

const initialState: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Component that renders the login form and processes credentials.
 *
 * @returns The login form as a React element.
 */
const LogInForm = (): React.ReactNode => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(logIn, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.state === "success") {
      toast.success(state.message);
      router.push(state.redirectTo ?? "/communities");
      return;
    }

    toast.error(state.message);
  }, [state, router]);

  return (
    <>
      <form action={formAction} id="loginForm" className={style.form} role="form">
        <div className={style.form__header}>
          <div className={style.form__avatar}>
            <Image src="/assets/icons/profile-100.png" alt="Profile icon" width={80} height={80} />
          </div>
          <h2 className={style.form__title}>Inicia sesión</h2>
          <p className={style.form__subtitle}>Accede a tu cuenta para continuar</p>
        </div>

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
            type: InputType.password,
            placeholder: "Introduzca su contraseña...",
            defaultValue: "",
            required: true
          }}
        />

        <Button type="submit" text="Enviar" disabled={isPending} fullWidth />
      </form>
    </>
  );
};

export default LogInForm;
