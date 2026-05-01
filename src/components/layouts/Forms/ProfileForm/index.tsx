"use client";

import updateProfile from "@/actions/updateProfile";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormComp/FormInput";
import { FormActionState, InputType } from "@/types";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

interface Props {
  nombre: string;
  apellido: string;
  email: string;
}

const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

const ProfileForm = ({ nombre, apellido, email }: Props): React.ReactNode => {
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    updateProfile,
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
    <div className={style.profileWrapper}>
      <div className={style.avatarSection}>
        <Image
          src="/assets/icons/profile-100.png"
          alt="Foto de perfil"
          width={100}
          height={100}
          className={style.avatar}
        />
      </div>

      <form action={accionFormulario} id="profileForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={estado?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: estado?.errors?.name ? "" : ((estado.payload?.get("name") as string) ?? nombre),
            placeholder: "Introduzca su nombre...",
            required: true
          }}
        />

        <FormInput
          labelText="Apellido"
          errorMsg={estado?.errors?.surname ?? ""}
          attr={{
            id: "surname",
            name: "surname",
            type: InputType.text,
            defaultValue: estado?.errors?.surname ? "" : ((estado.payload?.get("surname") as string) ?? apellido),
            placeholder: "Introduzca su apellido...",
            required: true
          }}
        />

        <FormInput
          labelText="Email"
          errorMsg={estado?.errors?.email ?? ""}
          attr={{
            id: "email",
            name: "email",
            type: InputType.email,
            defaultValue: estado?.errors?.email ? "" : ((estado.payload?.get("email") as string) ?? email),
            placeholder: "Introduzca su email...",
            required: true
          }}
        />

        <FormInput
          labelText="Nueva contraseña"
          errorMsg={estado?.errors?.password ?? ""}
          attr={{
            id: "password",
            name: "password",
            type: InputType.password,
            defaultValue: (estado.payload?.get("password") as string) ?? "",
            placeholder: "Introduzca una nueva contraseña...",
            required: false
          }}
        />

        <FormInput
          labelText="Repetir nueva contraseña"
          errorMsg={estado?.errors?.repeat ?? ""}
          attr={{
            id: "repeat",
            name: "repeat",
            type: InputType.password,
            defaultValue: (estado.payload?.get("repeat") as string) ?? "",
            placeholder: "Repita la nueva contraseña...",
            required: false
          }}
        />

        <Button type="submit" text="Guardar" disabled={estaPendiente} fullWidth />
      </form>
    </div>
  );
};

export default ProfileForm;
