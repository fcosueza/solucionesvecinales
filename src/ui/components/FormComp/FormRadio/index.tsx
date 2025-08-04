import { FormRadioAttrs, RadioType } from "@/types";

interface Props {
  legend: string;
  type: RadioType;
  attr: [{ labelText: string; radioAttr: FormRadioAttrs[] }];
  errorMsg?: string | string[];
}

const FormRadio = ({ legend, type, attr, errorMsg = "" }: Props): React.ReactNode => {
  return <h1>Radio suite</h1>;
};

export default FormRadio;
