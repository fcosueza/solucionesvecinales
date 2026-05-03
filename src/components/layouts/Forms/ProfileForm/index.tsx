"use client";

import { deleteProfile, updateProfile } from "@/actions/profile";
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
  tieneComunidades?: boolean;
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

const ProfileForm = ({ nombre, apellido, email, rol, imagen, tieneComunidades = false }: Props): React.ReactNode => {
  const router = useRouter();
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    updateProfile,
    estadoInicial
  );
  const [estadoEliminar, accionEliminarPerfil, eliminandoPerfil] = useActionState<FormActionState, FormData>(
    deleteProfile,
    estadoInicial
  );
  const primerApellido = apellido.trim().split(/\s+/)[0] ?? "";
  const esAdmin = rol === UserRole.admin || rol === UserRole.webAdmin;
  const [popupEliminarAbierto, setPopupEliminarAbierto] = useState(false);
  const [popupBloqueadoAbierto, setPopupBloqueadoAbierto] = useState(false);
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
    if (!estadoEliminar.message) return;

    toast.error(estadoEliminar.message);
  }, [estadoEliminar]);

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

        <div className={style.actionsRow}>
          <Button type="submit" text="Guardar" disabled={estaPendiente || eliminandoPerfil} />
          <Button
            type="button"
            text="Eliminar perfil"
            variant="danger"
            onClick={() => {
              if (esAdmin && tieneComunidades) {
                setPopupBloqueadoAbierto(true);
              } else {
                setPopupEliminarAbierto(true);
              }
            }}
          />
        </div>
      </form>

      {popupBloqueadoAbierto && (
        <div className={style.overlay} onClick={() => setPopupBloqueadoAbierto(false)}>
          <div
            className={style.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blocked-delete-title"
            onClick={event => event.stopPropagation()}
          >
            <h3 id="blocked-delete-title" className={style.popupTitle}>
              No puedes eliminar tu cuenta
            </h3>
            <p className={style.popupDescription}>
              Eres administrador de una o mas comunidades. Debes eliminar todas tus comunidades desde la seccion de
              Configuracion de cada una antes de poder eliminar tu cuenta.
            </p>
            <div className={style.popupActions}>
              <Button
                type="button"
                text="Entendido"
                variant="secondary"
                onClick={() => setPopupBloqueadoAbierto(false)}
              />
            </div>
          </div>
        </div>
      )}

      {popupEliminarAbierto && (
        <div className={style.overlay} onClick={() => !eliminandoPerfil && setPopupEliminarAbierto(false)}>
          <div
            className={style.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            onClick={event => event.stopPropagation()}
          >
            <h3 id="confirm-delete-title" className={style.popupTitle}>
              Confirmar eliminacion
            </h3>
            <p className={style.popupDescription}>
              Esta accion eliminara tu cuenta y todos tus datos de forma permanente.
            </p>
            <div className={style.popupActions}>
              <Button
                type="button"
                text="Cancelar"
                variant="secondary"
                disabled={eliminandoPerfil}
                onClick={() => setPopupEliminarAbierto(false)}
              />
              <form action={accionEliminarPerfil}>
                <Button
                  type="submit"
                  text={eliminandoPerfil ? "Eliminando..." : "Eliminar"}
                  variant="danger"
                  disabled={eliminandoPerfil}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
