"use client";

import signUp from "@/actions/auth/signUp";
import { useActionState } from "react";
import { FormActionState } from "@/types/types";
import Button from "../../Button";
import style from "./style.module.css";

const initialState = {
  message: ""
};

/**
 * Componente SignUpForm
 *
 * Componente que genera un formulario de registro que permite a un usuario
 * registrarse en el sistema con sus datos.
 *
 * @return Nodo de React con el formulario de login.
 */

const SignUpForm = (): React.ReactNode => {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(
    signUp,
    initialState
  );

  return (
    <>
      <form action={formAction} id="contactForm" aria-label="signup-form" className={style.form}>
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
            minLength={15}
            className={style.form__input}
            placeholder="Introduzca su contraseña..."
          />
          <p className={style.errorMsg}>{state?.errors?.name && "*" + state.errors.name}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="password" className={style.form__label}>
            Repite la Contraseña (15 caracteres min.) <span title="Requerido">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={15}
            className={style.form__input}
            placeholder="Introduzca su contraseña..."
          />
          <p className={style.errorMsg}>{state?.errors?.name && "*" + state.errors.name}</p>
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
            placeholder="Introduzca su nombre..."
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
            placeholder="Introduzca sus apellidos..."
            required
          />
          <p className={style.errorMsg}>{state?.errors?.surname && "*" + state.errors.surname}</p>
        </div>
        <div className={style.form__control}>
          <fieldset className={style.form__fieldset}>
            <legend className={style.form__label}>
              Selecciona el rol de tu usuario: <span title="Requerido">*</span>
            </legend>
            <div className={style.form__controlRadio}>
              <input
                type="radio"
                id="inquilino"
                name="rol"
                value="inquilino"
                className={style.form__radio}
                defaultChecked
              />
              <label htmlFor="inquilino">inquilino</label>
            </div>
            <div className={style.form__controlRadio}>
              <input
                type="radio"
                id="administrador"
                name="rol"
                value="administrador"
                className={style.form__radio}
              />
              <label htmlFor="administrador">administrador</label>
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
            className={style.form__input}
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
            className={style.form__input}
            placeholder="Introduzca el piso..."
          />
          <p className={style.errorMsg}>{state?.errors?.floor && "*" + state.errors.floor}</p>
        </div>
        <div role="form-control" className={style.form__control}>
          <label htmlFor="letter" className={style.form__label}>
            Letra <span title="Requerido">*</span>
          </label>
          <input
            type="text"
            name="letter"
            id="letter"
            minLength={1}
            maxLength={1}
            className={style.form__input}
            placeholder="Introduzca su letra..."
            required
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
