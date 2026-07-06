"use client";

import signUp from "@/actions/auth/signUp";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FormActionState, InputType, RadioBoxType, UserRole } from "@/types";
import FormInput from "@/components/ui/FormComp/FormInput";
import FormRadioBox from "@/components/ui/FormComp/FormRadioBox";
import Button from "../../../ui/Button";
import { toast } from "sonner";
import Image from "next/image";
import style from "./style.module.css";

const initialState = {
  state: "error" as const,
  message: ""
};

/**
 * Component that renders the registration form and manages the creation of users.
 *
 * @returns The registration form as a React element.
 */
const SignUpForm = (): React.ReactNode => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(signUp, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.state === "success") {
      toast.success(state.message);
      router.push("/login");
      return;
    }

    toast.error(state.message);
  }, [state, router]);

  return (
    <>
      <form action={formAction} id="signupForm" role="form" className={style.form}>
        <div className={style.form__header}>
          <div className={style.form__avatar}>
            <Image src="/assets/icons/profile-100.png" alt="Profile icon" width={80} height={80} />
          </div>
          <h2 className={style.form__title}>Crea tu cuenta</h2>
          <p className={style.form__subtitle}>Completa los datos para registrarte</p>
        </div>
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
            defaultValue: "",
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
            defaultValue: "",
            required: true
          }}
        />

        <Button type="submit" text="Enviar" disabled={isPending} fullWidth />
      </form>
    </>
  );
};

export default SignUpForm;
