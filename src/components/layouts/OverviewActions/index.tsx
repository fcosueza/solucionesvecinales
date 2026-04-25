"use client";

import Button from "@/components/ui/Button";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import style from "./style.module.css";

interface Props {
  role: UserRole;
}

const OverviewActions = ({ role }: Props): React.ReactNode => {
  const enrutador = useRouter();
  const esAdministrador = role === UserRole.admin || role === UserRole.webAdmin;

  return (
    <div className={style.container}>
      <h2 className={style.title}>Acciones rápidas</h2>

      <div className={style.buttons}>
        <Button text="Buscar comunidad" onClick={() => enrutador.push("/communities/search")} />

        {esAdministrador ? (
          <Button text="Añadir comunidad" onClick={() => enrutador.push("/communities/add")} />
        ) : null}
      </div>
    </div>
  );
};

export default OverviewActions;