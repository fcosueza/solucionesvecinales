"use client";

import Button from "@/ui/components/Button";
import logOutAction from "@/actions/auth/logOutAction";
import { useRouter } from "next/navigation";

interface Props {
  questionText?: string;
  confirmText?: string;
  cancelText?: string;
}

const LogOutForm = ({
  questionText = "You want to logout?",
  confirmText = "Yes",
  cancelText = "No"
}: Props): React.ReactNode => {
  const router = useRouter();

  return (
    <>
      <form action={logOutAction} id="logOutFOrm" role="form">
        <h3>{questionText}</h3>
        <Button text={confirmText} type="submit" />
        <Button text={cancelText} type="button" onClick={() => router.back()} />
      </form>
    </>
  );
};

export default LogOutForm;
