"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./style.module.css";

const etiquetasSegmento: Record<string, string> = {
  profile: "Perfil",
  communities: "Mis comunidades",
  add: "Añadir",
  search: "Buscar"
};

const Breadcrumb = (): React.ReactNode => {
  const rutaActual = usePathname();
  const segmentos = rutaActual.split("/").filter(Boolean);

  const migajas = segmentos.map((segmento, indice) => {
    const href = "/" + segmentos.slice(0, indice + 1).join("/");
    const etiqueta = etiquetasSegmento[segmento] ?? segmento;
    const esUltimo = indice === segmentos.length - 1;

    return { href, etiqueta, esUltimo };
  });

  if (migajas.length <= 1) return null;

  return (
    <nav aria-label="Ruta de navegación" className={style.breadcrumb}>
      <ol className={style.list}>
        {migajas.map(({ href, etiqueta, esUltimo }) => (
          <li key={href} className={style.item}>
            {esUltimo ? (
              <span className={style.current} aria-current="page">
                {etiqueta}
              </span>
            ) : (
              <>
                <Link href={href} className={style.link}>
                  {etiqueta}
                </Link>
                <span className={style.separator} aria-hidden="true">
                  /
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
