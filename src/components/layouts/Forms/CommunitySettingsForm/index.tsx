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
  nombre: string;
  calle: string;
  numero: number;
  ciudad: string;
  provincia: string;
  pais: string;
}

const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

const CommunitySettingsForm = ({
  communityID,
  nombre,
  calle,
  numero,
  ciudad,
  provincia,
  pais
}: Props): React.ReactNode => {
  const router = useRouter();
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    updateCommunity,
    estadoInicial
  );
  const [estadoEliminar, accionEliminar, eliminando] = useActionState<FormActionState, FormData>(
    deleteCommunity,
    estadoInicial
  );
  const [popupEliminarAbierto, setPopupEliminarAbierto] = useState(false);

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

  return (
    <div className={style.settingsWrapper}>
      <div className={style.infoSection}>
        <div className={style.communityImageFrame}>
          <Image
            src="/assets/images/default-community.jpeg"
            alt={`Imagen de la comunidad ${nombre}`}
            width={160}
            height={160}
            className={style.communityImage}
          />
        </div>
        <div className={style.communitySummary}>
          <p className={style.communityName}>{nombre}</p>
          <p className={style.communityAddress}>
            {calle}, {numero}
          </p>
          <p className={style.communityAddress}>
            {ciudad}, {provincia}
          </p>
          <p className={style.communityAddress}>{pais}</p>
        </div>
      </div>

      <form action={accionFormulario} id="communitySettingsForm" role="form" className={style.form}>
        <input type="hidden" name="communityID" value={communityID} />

        <FormInput
          labelText="Nombre"
          errorMsg={estado?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: estado?.errors?.name ? "" : ((estado.payload?.get("name") as string) ?? nombre),
            placeholder: "Introduce el nombre de la comunidad...",
            required: true
          }}
        />

        <FormInput
          labelText="Calle"
          errorMsg={estado?.errors?.street ?? ""}
          attr={{
            id: "street",
            name: "street",
            type: InputType.text,
            defaultValue: estado?.errors?.street ? "" : ((estado.payload?.get("street") as string) ?? calle),
            placeholder: "Introduce la calle...",
            required: true
          }}
        />

        <FormInput
          labelText="Número"
          errorMsg={estado?.errors?.number ?? ""}
          attr={{
            id: "number",
            name: "number",
            type: InputType.number,
            defaultValue: estado?.errors?.number ? "" : ((estado.payload?.get("number") as string) ?? String(numero)),
            placeholder: "Introduce el número...",
            required: true
          }}
        />

        <FormInput
          labelText="Ciudad"
          errorMsg={estado?.errors?.city ?? ""}
          attr={{
            id: "city",
            name: "city",
            type: InputType.text,
            defaultValue: estado?.errors?.city ? "" : ((estado.payload?.get("city") as string) ?? ciudad),
            placeholder: "Introduce la ciudad...",
            required: true
          }}
        />

        <FormInput
          labelText="Provincia"
          errorMsg={estado?.errors?.province ?? ""}
          attr={{
            id: "province",
            name: "province",
            type: InputType.text,
            defaultValue: estado?.errors?.province ? "" : ((estado.payload?.get("province") as string) ?? provincia),
            placeholder: "Introduce la provincia...",
            required: true
          }}
        />

        <FormInput
          labelText="País"
          errorMsg={estado?.errors?.country ?? ""}
          attr={{
            id: "country",
            name: "country",
            type: InputType.text,
            defaultValue: estado?.errors?.country ? "" : ((estado.payload?.get("country") as string) ?? pais),
            placeholder: "Introduce el país...",
            required: true
          }}
        />

        <div className={style.actionsRow}>
          <Button type="submit" text="Guardar" disabled={estaPendiente || eliminando} />
          <Button
            type="button"
            text="Eliminar comunidad"
            variant="danger"
            onClick={() => setPopupEliminarAbierto(true)}
          />
        </div>
      </form>

      {popupEliminarAbierto && (
        <div className={style.overlay} onClick={() => !eliminando && setPopupEliminarAbierto(false)}>
          <div
            className={style.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-community-title"
            onClick={event => event.stopPropagation()}
          >
            <h3 id="confirm-delete-community-title" className={style.popupTitle}>
              Confirmar eliminacion
            </h3>
            <p className={style.popupDescription}>
              Esta accion eliminara la comunidad <strong>{nombre}</strong> y todos sus datos de forma permanente.
            </p>
            <div className={style.popupActions}>
              <Button
                type="button"
                text="Cancelar"
                variant="secondary"
                disabled={eliminando}
                onClick={() => setPopupEliminarAbierto(false)}
              />
              <form action={accionEliminar}>
                <input type="hidden" name="communityID" value={communityID} />
                <Button
                  type="submit"
                  text={eliminando ? "Eliminando..." : "Eliminar"}
                  variant="danger"
                  disabled={eliminando}
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
