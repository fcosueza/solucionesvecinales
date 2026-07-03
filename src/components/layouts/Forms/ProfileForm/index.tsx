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
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  image?: string;
  hasCommunities?: boolean;
}
const initialState: FormActionState = {
  state: "error" as const,
  message: ""
};

const roleLabels: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

/**
 * Form to update the profile of the authenticated user.
 * Allows you to modify name, surname, email and avatar.
 * It also includes the option to permanently delete the account.
 * Administrators with active communities cannot delete their account directly.
 *
 * @param name Current user name
 * @param surname User's current last name(s)
 * @param email User's current email
 * @param role Role of the user (tenant, admin, webAdmin)
 * @param image URL of the user's current avatar (optional)
 * @param hasCommunities Indicates whether the administrator has active communities (false by default)
 */
const ProfileForm = ({ name, surname, email, role, image, hasCommunities = false }: Props): React.ReactNode => {
  const router = useRouter();
  const [state, formState, isPending] = useActionState<FormActionState, FormData>(updateProfile, initialState);
  const [deleteState, deleteAction, isDeleting] = useActionState<FormActionState, FormData>(
    deleteProfile,
    initialState
  );
  const firstSurname = surname.trim().split(/\s+/)[0] ?? "";
  const isAdmin = role === UserRole.admin || role === UserRole.webAdmin;
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [blockedPopupOpen, setBlockedPopupOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(image ?? "/assets/icons/profile-100.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewAvatarRef = useRef<string | null>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.state === "success") {
      toast.success(state.message);
      router.refresh();
      return;
    }

    toast.error(state.message);
  }, [state, router]);

  useEffect(() => {
    if (!deleteState.message) return;

    if (deleteState.state === "success") {
      toast.success(deleteState.message);
      router.refresh();
      return;
    }

    toast.error(deleteState.message);
  }, [deleteState, router]);

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
            disabled={isPending}
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
          <p className={style.userName}>{`${name} ${firstSurname}`.trim()}</p>
          <p className={style.userRole}>{roleLabels[role]}</p>
        </div>
      </div>

      <form action={formState} id="profileForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={state?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: state?.errors?.name ? "" : ((state.payload?.get("name") as string) ?? name),
            placeholder: "Introduzca su nombre...",
            required: true
          }}
        />

        <FormInput
          labelText="Apellido"
          errorMsg={state?.errors?.surname ?? ""}
          attr={{
            id: "surname",
            name: "surname",
            type: InputType.text,
            defaultValue: state?.errors?.surname ? "" : ((state.payload?.get("surname") as string) ?? firstSurname),
            placeholder: "Introduzca su apellido...",
            required: true
          }}
        />

        <FormInput
          labelText="Email"
          errorMsg={state?.errors?.email ?? ""}
          attr={{
            id: "email",
            name: "email",
            type: InputType.email,
            defaultValue: state?.errors?.email ? "" : ((state.payload?.get("email") as string) ?? email),
            placeholder: "Introduzca su email...",
            required: true
          }}
        />

        <FormInput
          labelText="Nueva contraseña"
          errorMsg={state?.errors?.password ?? ""}
          attr={{
            id: "password",
            name: "password",
            type: InputType.password,
            defaultValue: (state.payload?.get("password") as string) ?? "",
            placeholder: "Introduzca una nueva contraseña...",
            required: false
          }}
        />

        <FormInput
          labelText="Repetir nueva contraseña"
          errorMsg={state?.errors?.repeat ?? ""}
          attr={{
            id: "repeat",
            name: "repeat",
            type: InputType.password,
            defaultValue: (state.payload?.get("repeat") as string) ?? "",
            placeholder: "Repita la nueva contraseña...",
            required: false
          }}
        />

        <div className={style.actionsRow}>
          <Button type="submit" text="Guardar" disabled={isPending || isDeleting} />
          <Button
            type="button"
            text="Eliminar perfil"
            variant="danger"
            onClick={() => {
              if (isAdmin && hasCommunities) {
                setBlockedPopupOpen(true);
              } else {
                setDeletePopupOpen(true);
              }
            }}
          />
        </div>
      </form>

      {blockedPopupOpen && (
        <div className={style.overlay} onClick={() => setBlockedPopupOpen(false)}>
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
              <Button type="button" text="Entendido" variant="secondary" onClick={() => setBlockedPopupOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {deletePopupOpen && (
        <div className={style.overlay} onClick={() => !isDeleting && setDeletePopupOpen(false)}>
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
                disabled={isDeleting}
                onClick={() => setDeletePopupOpen(false)}
              />
              <form action={deleteAction}>
                <Button
                  type="submit"
                  text={isDeleting ? "Eliminando..." : "Eliminar"}
                  variant="danger"
                  disabled={isDeleting}
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
