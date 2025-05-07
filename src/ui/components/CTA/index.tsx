"use client";

import Button from "../Button";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

interface Props {
  title: string;
  para: string;
  buttonText: string;
  buttonRoute?: string;
}

const CTA = ({ title, para, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const router = useRouter();

  return (
    <div className={style.cta}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.para}>{para}</p>
      <Button text={buttonText} type="button" onClick={() => router.push(buttonRoute)} />
    </div>
  );
};

export default CTA;
