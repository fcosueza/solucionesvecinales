"use client";

import { deleteCommunity, updateCommunity } from "@/actions/community/communitySettings";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormComp/FormInput";
import { FormActionState, InputType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

interface Props {
  communityID: number;
  name: string;
  street: string;
  number: number;
  city: string;
  province: string;
  country: string;
}

const initialState: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Form to update a community configuration.
 * Allows you to modify name, address (street, number, city, province, country).
 * It also includes the option to delete the community permanently.
 *
 * @param communityID Community ID to edit
 * @param name Current name of the community
 * @param street Current community street
 * @param number Current building number
 * @param city Current city
 * @param province Current province
 * @param country Current country
 */
const CommunitySettingsForm = ({
  communityID,
  name,
  street,
  number,
  city,
  province,
  country
}: Props): React.ReactNode => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(updateCommunity, initialState);
  const [deleteState, deleteAction, isDeleting] = useActionState<FormActionState, FormData>(
    deleteCommunity,
    initialState
  );
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

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

    toast.error(deleteState.message);
  }, [deleteState]);

  return (
    <div className={style.settingsWrapper}>
      <div className={style.infoSection}>
        <div className={style.communityImageFrame}>
          <Image
            src="/assets/images/default-community.jpeg"
            alt={`Imagen de la comunidad ${name}`}
            width={160}
            height={160}
            className={style.communityImage}
          />
        </div>
        <div className={style.communitySummary}>
          <p className={style.communityName}>{name}</p>
          <p className={style.communityAddress}>
            {street}, {number}
          </p>
          <p className={style.communityAddress}>
            {city}, {province}
          </p>
          <p className={style.communityAddress}>{country}</p>
        </div>
      </div>

      <form action={formAction} id="communitySettingsForm" role="form" className={style.form}>
        <input type="hidden" name="communityID" value={communityID} />

        <FormInput
          labelText="Nombre"
          errorMsg={state?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: state?.errors?.name ? "" : ((state.payload?.get("name") as string) ?? name),
            placeholder: "Introduce el nombre de la comunidad...",
            required: true
          }}
        />

        <FormInput
          labelText="Calle"
          errorMsg={state?.errors?.street ?? ""}
          attr={{
            id: "street",
            name: "street",
            type: InputType.text,
            defaultValue: state?.errors?.street ? "" : ((state.payload?.get("street") as string) ?? street),
            placeholder: "Introduce la calle...",
            required: true
          }}
        />

        <FormInput
          labelText="Número"
          errorMsg={state?.errors?.number ?? ""}
          attr={{
            id: "number",
            name: "number",
            type: InputType.number,
            defaultValue: state?.errors?.number ? "" : ((state.payload?.get("number") as string) ?? String(number)),
            placeholder: "Introduce el número...",
            required: true
          }}
        />

        <FormInput
          labelText="Ciudad"
          errorMsg={state?.errors?.city ?? ""}
          attr={{
            id: "city",
            name: "city",
            type: InputType.text,
            defaultValue: state?.errors?.city ? "" : ((state.payload?.get("city") as string) ?? city),
            placeholder: "Introduce la ciudad...",
            required: true
          }}
        />

        <FormInput
          labelText="Provincia"
          errorMsg={state?.errors?.province ?? ""}
          attr={{
            id: "province",
            name: "province",
            type: InputType.text,
            defaultValue: state?.errors?.province ? "" : ((state.payload?.get("province") as string) ?? province),
            placeholder: "Introduce la provincia...",
            required: true
          }}
        />

        <FormInput
          labelText="País"
          errorMsg={state?.errors?.country ?? ""}
          attr={{
            id: "country",
            name: "country",
            type: InputType.text,
            defaultValue: state?.errors?.country ? "" : ((state.payload?.get("country") as string) ?? country),
            placeholder: "Introduce el país...",
            required: true
          }}
        />

        <div className={style.actionsRow}>
          <Button type="submit" text="Guardar" disabled={isPending || isDeleting} />
          <Button type="button" text="Eliminar comunidad" variant="danger" onClick={() => setIsDeletePopupOpen(true)} />
        </div>
      </form>

      {isDeletePopupOpen && (
        <div className={style.overlay} onClick={() => !isDeleting && setIsDeletePopupOpen(false)}>
          <div
            className={style.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-community-title"
            onClick={event => event.stopPropagation()}
          >
            <h3 id="confirm-delete-community-title" className={style.popupTitle}>
              Confirmar eliminación
            </h3>
            <p className={style.popupDescription}>
              Esta accion eliminara la comunidad <strong>{name}</strong> y todos sus datos de forma permanente.
            </p>
            <div className={style.popupActions}>
              <Button
                type="button"
                text="Cancelar"
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setIsDeletePopupOpen(false)}
              />
              <form action={deleteAction}>
                <input type="hidden" name="communityID" value={communityID} />
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

export default CommunitySettingsForm;
