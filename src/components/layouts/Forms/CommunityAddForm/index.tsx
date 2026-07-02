"use client";

import addCommunity from "@/actions/community/community";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormComp/FormInput";
import { FormActionState, InputType } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import style from "./style.module.css";

const initialState: FormActionState = {
  state: "error" as const,
  message: ""
};

/**
 * Component that renders the form to add a new community.
 *
 * @param props - Props of the CommunityAddForm component.
 * @returns The community registration form as a React element.
 */
const CommunityAddForm = (): React.ReactNode => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(addCommunity, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.state === "success") {
      toast.success(state.message);
      router.push("/communities");
      return;
    }

    toast.error(state.message);
  }, [state, router]);

  return (
    <>
      <form action={formAction} id="communityAddForm" role="form" className={style.form}>
        <FormInput
          labelText="Nombre"
          errorMsg={state?.errors?.name ?? ""}
          attr={{
            id: "name",
            name: "name",
            type: InputType.text,
            defaultValue: state?.errors?.name ? "" : ((state.payload?.get("name") as string) ?? ""),
            placeholder: "Introduzca el nombre de la comunidad...",
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
            defaultValue: state?.errors?.street ? "" : ((state.payload?.get("street") as string) ?? ""),
            placeholder: "Introduzca la calle...",
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
            defaultValue: state?.errors?.number ? "" : ((state.payload?.get("number") as string) ?? ""),
            placeholder: "Introduzca el número...",
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
            defaultValue: state?.errors?.city ? "" : ((state.payload?.get("city") as string) ?? ""),
            placeholder: "Introduzca la ciudad...",
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
            defaultValue: state?.errors?.province ? "" : ((state.payload?.get("province") as string) ?? ""),
            placeholder: "Introduzca la provincia...",
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
            defaultValue: state?.errors?.country ? "" : ((state.payload?.get("country") as string) ?? ""),
            placeholder: "Introduzca el país...",
            required: true
          }}
        />

        <Button type="submit" text="Crear comunidad" disabled={isPending} />
      </form>
    </>
  );
};

export default CommunityAddForm;
