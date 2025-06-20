"use client";

import signUpAction from "@/actions/auth/signUpAction";
import { useActionState } from "react";
import { FormActionState } from "@/types";
import Button from "../../../components/Button";
import style from "./style.module.css";

const initialState = {
  message: ""
};

const SignUpForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    signUpAction,
    initialState
  );

  return (
    <>
      <form action={formAction} id="signupForm" role="form" className={style.form}>
        <h3 className={style.form__title}>Datos de Sesión</h3>
        <hr className={style.form__separator} />
        <div role="form-control" className={style.form__control}>
          <label htmlFor="email" className={style.form__label}>
            Correo <span title="Requerido">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={style.form__input}
            placeholder="Introduzca su correo..."
            defaultValue={state?.errors?.email ? "" : (state.payload?.get("email") as string) || ""}
            aria-label="email-input"
            required
          />
          <p className={style.errorMsg}>{state?.errors?.email && "*" + state.errors.email}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="password" className={style.form__label}>
            Contraseña (15 caracteres min.) <span title="Requerido">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={style.form__input}
            defaultValue={
              state?.errors?.password ? "" : (state.payload?.get("password") as string) || ""
            }
            placeholder="Introduzca su contraseña..."
            aria-label="password-input"
          />
          <p className={style.errorMsg}>{state?.errors?.password && "*" + state.errors.password}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="repeat" className={style.form__label}>
            Repite la Contraseña (15 caracteres min.) <span title="Requerido">*</span>
          </label>
          <input
            type="password"
            name="repeat"
            id="repeat"
            className={style.form__input}
            defaultValue={
              state?.errors?.password_repeat ? "" : (state.payload?.get("repeat") as string) || ""
            }
            aria-label="repeat-input"
            placeholder="Introduzca su contraseña..."
          />
          <p className={style.errorMsg}>
            {state?.errors?.password_repeat && "*" + state.errors.password_repeat}
          </p>
        </div>

        <h3 className={style.form__title}>Datos de Usuario</h3>
        <hr className={style.form__separator} />
        <div role="form-control" className={style.form__control}>
          <label htmlFor="username" className={style.form__label}>
            Nombre de Usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className={style.form__input}
            defaultValue={
              state?.errors?.username ? "" : (state.payload?.get("username") as string) || ""
            }
            aria-label="username-input"
            placeholder="Introduzca su nombre de usuario..."
          />
          <p className={style.errorMsg}>{state?.errors?.username && "*" + state.errors.username}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="name" className={style.form__label}>
            Nombre <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={style.form__input}
            defaultValue={state?.errors?.name ? "" : (state.payload?.get("name") as string) || ""}
            placeholder="Introduzca su nombre..."
            aria-label="name-input"
            required
          />
          <p className={style.errorMsg}>{state?.errors?.name && "*" + state.errors.name}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="surname" className={style.form__label}>
            Apellidos <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            className={style.form__input}
            defaultValue={
              state?.errors?.surname ? "" : (state.payload?.get("surname") as string) || ""
            }
            placeholder="Introduzca sus apellidos..."
            aria-label="surname-input"
            required
          />
          <p className={style.errorMsg}>{state?.errors?.surname && "*" + state.errors.surname}</p>
        </div>
        <div className={style.form__control}>
          <fieldset className={style.form__fieldset} role="radiogroup">
            <legend className={style.form__label}>
              Selecciona el rol de tu usuario: <span title="Requerido">*</span>
            </legend>
            <div className={style.form__controlRadio}>
              <input
                type="radio"
                id="tenant"
                name="role"
                value="tenant"
                className={style.form__radio}
                aria-label="tenant-radio"
                defaultChecked
              />
              <label htmlFor="tenant">inquilino</label>
            </div>
            <div className={style.form__controlRadio}>
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                aria-label="admin-radio"
                className={style.form__radio}
              />
              <label htmlFor="admin">administrador</label>
            </div>
            <p className={style.errorMsg}>{state?.errors?.rol && "*" + state.errors.rol}</p>
          </fieldset>
        </div>

        <h3 className={style.form__title}>Datos de Dirección</h3>
        <hr className={style.form__separator} />
        <div role="form-control" className={style.form__control}>
          <label htmlFor="address" className={style.form__label}>
            Calle <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className={style.form__input}
            defaultValue={
              state?.errors?.address ? "" : (state.payload?.get("address") as string) || ""
            }
            placeholder="Introduzca su calle..."
            required
          />
          <p className={style.errorMsg}>{state?.errors?.address && "*" + state.errors.address}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="number" className={style.form__label}>
            Número <span title="Requerido">*</span>
          </label>
          <input
            type="number"
            name="number"
            id="number"
            min="0"
            className={style.form__input}
            defaultValue={
              state?.errors?.number ? "" : (state.payload?.get("number") as string) || ""
            }
            placeholder="Introduzca el número de su casa/edificio..."
            required
          />
          <p className={style.errorMsg}>{state?.errors?.number && "*" + state.errors.number}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="floor" className={style.form__label}>
            Piso
          </label>
          <input
            type="number"
            name="floor"
            id="floor"
            min="0"
            className={style.form__input}
            defaultValue={state?.errors?.floor ? "" : (state.payload?.get("floor") as string) || ""}
            placeholder="Introduzca el piso..."
          />
          <p className={style.errorMsg}>{state?.errors?.floor && "*" + state.errors.floor}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="letter" className={style.form__label}>
            Letra
          </label>
          <input
            type="text"
            name="letter"
            id="letter"
            minLength={1}
            maxLength={1}
            className={style.form__input}
            defaultValue={
              state?.errors?.letter ? "" : (state.payload?.get("letter") as string) || ""
            }
            placeholder="Introduzca su letra..."
          />
          <p className={style.errorMsg}>{state?.errors?.letter && "*" + state.errors.letter}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="city" className={style.form__label}>
            Localidad <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className={style.form__input}
            defaultValue={state?.errors?.city ? "" : (state.payload?.get("city") as string) || ""}
            placeholder="Introduzca su letra..."
            required
          />
          <p className={style.errorMsg}>{state?.errors?.city && "*" + state.errors.city}</p>
        </div>

        <Button type="submit" text="Enviar" disabled={isPending} />
      </form>
    </>
  );
};

export default SignUpForm;
