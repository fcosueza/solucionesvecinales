"use client";

import FormInput from "@/components/ui/FormComp/FormInput";
import { InputType } from "@/types";
import style from "./style.module.css";

interface Props {
  defaultValue?: string;
}

/**
 * Standalone search input used to filter communities.
 *
 * @param props - Search input props.
 * @param props.defaultValue - Initial text used to prefill the search field from query params.
 *
 * @returns A GET-based search form that submits query text to the current page.
 */
const CommunitySearchForm = ({ defaultValue = "" }: Props): React.ReactNode => {
  return (
    <form method="get" className={style.container} role="search" aria-label="community-search-form">
      <FormInput
        labelText=""
        attr={{
          id: "community-search",
          name: "q",
          type: InputType.text,
          placeholder: "Escribe nombre, calle, ciudad, provincia o pais...",
          defaultValue
        }}
      />
    </form>
  );
};

export default CommunitySearchForm;
