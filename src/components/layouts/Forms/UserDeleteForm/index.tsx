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

/**
 * This function renders a form that allows the deletion of a user by their ID.
 * It uses the `useActionState` hook to manage the state of the deletion action.
 *
 * @param userId The ID of the user to be deleted.
 * @param deleteClassName Optional CSS class name for styling the delete button.
 *
 * @returns A React component that renders the user deletion form.
 */
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
