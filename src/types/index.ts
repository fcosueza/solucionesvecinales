export enum UserRole {
  tenant = "tenant",
  admin = "admin",
  webAdmin = "webAdmin"
}

export enum InputType {
  text = "text",
  password = "password",
  number = "number",
  date = "date",
  email = "email",
  hidden = "hidden",
  range = "range",
  tel = "tel",
  file = "file",
  textarea = "textarea"
}

export enum RadioType {
  radio = "radio",
  checkbox = "checkbox"
}
export interface NavItem {
  text: string;
  href: string;
}
export interface SocialIcon {
  src: string;
  url: string;
  altText: string;
  title: string;
  width: number;
  height: number;
}

export interface FormActionState {
  state: "error" | "success";
  message: string;
  errors?: Record<string, string | string[]>;
  payload?: FormData;
}

export interface FormFieldAttrs {
  id: string;
  name?: string;
}

export interface FormInputAttrs extends FormFieldAttrs {
  type: InputType;
  defaultValue?: string | number | undefined;
  placeholder?: string;
  pattern?: string;
  title?: string;
  required?: boolean;
}

export interface FormRadioAttrs extends FormFieldAttrs {
  value: string | number | undefined;
  defaultChecked?: boolean;
}
