"use client";

import addCommunity from "@/actions/addCommunity";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormComp/FormInput";
import { FormActionState, InputType } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

const estadoInicial: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Componente que renderiza el formulario para añadir una nueva comunidad.
 *
 * @param props - Props del componente CommunityAddForm.
 * @returns El formulario de alta de comunidad como un elemento React.
 */
const CommunityAddForm = (): React.ReactNode => {
  const router = useRouter();
  const [estado, accionFormulario, estaPendiente] = useActionState<FormActionState, FormData>(
    addCommunity,
    estadoInicial
  );

  useEffect(() => {
    if (!estado.message) return;

    if (estado.state === "success") {
      toast.success(estado.message);
      router.push("/overview");
      return;
    }

    toast.error(estado.message);
  }, [estado, router]);

  return (
    <>
      <form action={accionFormulario} id="communityAddForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={estado?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: estado?.errors?.name ? "" : ((estado.payload?.get("name") as string) ?? ""),
            placeholder: "Introduzca el nombre de la comunidad...",
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
            defaultValue: estado?.errors?.street ? "" : ((estado.payload?.get("street") as string) ?? ""),
            placeholder: "Introduzca la calle...",
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
            defaultValue: estado?.errors?.number ? "" : ((estado.payload?.get("number") as string) ?? ""),
            placeholder: "Introduzca el número...",
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
            defaultValue: estado?.errors?.city ? "" : ((estado.payload?.get("city") as string) ?? ""),
            placeholder: "Introduzca la ciudad...",
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
            defaultValue: estado?.errors?.province ? "" : ((estado.payload?.get("province") as string) ?? ""),
            placeholder: "Introduzca la provincia...",
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
            defaultValue: estado?.errors?.country ? "" : ((estado.payload?.get("country") as string) ?? ""),
            placeholder: "Introduzca el país...",
            required: true
          }}
        />

        <Button type="submit" text="Crear comunidad" disabled={estaPendiente} />
      </form>
    </>
  );
};

export default CommunityAddForm;
