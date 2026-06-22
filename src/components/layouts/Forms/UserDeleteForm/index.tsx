"use client";

import { useActionState } from "react";
import { deleteUser } from "@/actions/user";
import { FormActionState } from "@/types";

interface UserDeleteFormProps {
  userId: string;
  deleteClassName?: string;
}

const initialState: FormActionState = {
  state: "error",
  message: ""
};

export default function UserDeleteForm({ userId, deleteClassName = "" }: UserDeleteFormProps) {
  const [estado, accionEliminar] = useActionState<FormActionState, FormData>(
    (_prevState: FormActionState, formData: FormData) => deleteUser(_prevState, formData),
    initialState
  );

  return (
    <>
      <form action={accionEliminar}>
        <input type="hidden" name="id" value={userId} />
        <button type="submit" className={deleteClassName}>
          Eliminar
        </button>
      </form>
      {estado.message && (
        <div style={{ color: estado.state === "success" ? "green" : "red", fontSize: "0.875rem", marginTop: "0.5rem" }}>
          {estado.message}
        </div>
      )}
    </>
  );
}
