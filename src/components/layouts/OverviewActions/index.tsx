"use client";

import Button from "@/components/ui/Button";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

interface Props {
  role: UserRole;
}

/**
 * Componente que representa las acciones disponibles en la vista general, mostrando botones según el rol del usuario.
 *
 * @param role El rol del usuario, utilizado para determinar qué acciones mostrar.
 * @returns Un nodo de React que representa las acciones disponibles en la vista general.
 */
const OverviewActions = ({ role }: Props): React.ReactNode => {
  const enrutador = useRouter();
  const esAdministrador = role === UserRole.admin || role === UserRole.webAdmin;

  return (
    <div className={style.container}>
      <div className={style.buttons}>
        <Button
          text="Buscar comunidad"
          onClick={() => enrutador.push("/communities/search")}
          className={style.compactButton}
        />

        {esAdministrador ? (
          <Button
            text="Añadir comunidad"
            onClick={() => enrutador.push("/communities/add")}
            className={style.compactButton}
          />
        ) : null}
      </div>
    </div>
  );
};

export default OverviewActions;
