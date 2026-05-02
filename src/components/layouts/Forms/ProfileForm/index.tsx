"use client";

import updateProfile from "@/actions/updateProfile";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormComp/FormInput";
import { FormActionState, InputType, UserRole } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

interface Props {
  nombre: string;
  apellido: string;
  email: string;
  rol: UserRole;
  imagen?: string;
}

// Estado inicial para el formulario de perfil
const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

const ProfileForm = ({ nombre, apellido, email, rol, imagen }: Props): React.ReactNode => {
  const router = useRouter();
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    updateProfile,
    estadoInicial
  );
  const primerApellido = apellido.trim().split(/\s+/)[0] ?? "";
  const [avatarSrc, setAvatarSrc] = useState(imagen ?? "/assets/icons/profile-100.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewAvatarRef = useRef<string | null>(null);

  useEffect(() => {
    if (!estado.message) return;

    if (estado.state === "success") {
      toast.success(estado.message);
      router.refresh();
      return;
    }

    toast.error(estado.message);
  }, [estado, router]);

  useEffect(() => {
    return () => {
      if (previewAvatarRef.current) {
        URL.revokeObjectURL(previewAvatarRef.current);
      }
    };
  }, []);

  return (
    <div className={style.profileWrapper}>
      <div className={style.avatarSection}>
        <div className={style.avatarFrame}>
          <Image src={avatarSrc} alt="Foto de perfil" width={160} height={160} className={style.avatar} />
          <button
            type="button"
            className={style.uploadBtn}
            aria-label="Subir foto de perfil"
            disabled={estaPendiente}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image src="/assets/icons/photo-24.png" alt="" width={16} height={16} />
          </button>
          <input
            ref={fileInputRef}
            name="imagen"
            form="profileForm"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className={style.fileInput}
            onChange={e => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (previewAvatarRef.current) {
                URL.revokeObjectURL(previewAvatarRef.current);
              }

              const previewUrl = URL.createObjectURL(file);
              previewAvatarRef.current = previewUrl;
              setAvatarSrc(previewUrl);
            }}
          />
        </div>
        <div className={style.userSummary}>
          <p className={style.userName}>{`${nombre} ${primerApellido}`.trim()}</p>
          <p className={style.userRole}>{etiquetasRol[rol]}</p>
        </div>
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

        <Button type="submit" text="Guardar" disabled={estaPendiente} className={style.submitButton} />
      </form>
    </div>
  );
};

export default ProfileForm;
