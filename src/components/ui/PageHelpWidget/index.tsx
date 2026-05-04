"use client";

import { useState } from "react";
import style from "./style.module.css";

export interface HelpContent {
  title: string;
  summary: string;
  steps: string[];
  constraints: string[];
}

interface Props {
  content: HelpContent;
}

/**
 * Widget de ayuda contextual para una página.
 * Muestra un botón "?" que abre un modal con título, resumen,
 * pasos de uso y restricciones de la página actual.
 *
 * @param content Objeto con la información de ayuda: título, resumen, pasos y restricciones
 */
const PageHelpWidget = ({ content }: Props): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={style.trigger}
        aria-label="Abrir ayuda de la página"
        onClick={() => setIsOpen(true)}
      >
        ?
      </button>

      {isOpen ? (
        <div className={style.overlay} role="dialog" aria-modal="true" aria-label="Ayuda de la página">
          <div className={style.modal}>
            <div className={style.header}>
              <h2 className={style.title}>{content.title}</h2>
              <button type="button" className={style.closeButton} onClick={() => setIsOpen(false)}>
                Cerrar
              </button>
            </div>

            <p className={style.summary}>{content.summary}</p>

            <section className={style.section}>
              <h3 className={style.sectionTitle}>Paso a paso</h3>
              <ol className={style.list}>
                {content.steps.map(step => (
                  <li key={step} className={style.listItem}>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className={style.section}>
              <h3 className={style.sectionTitle}>Restricciones</h3>
              <ul className={style.list}>
                {content.constraints.map(constraint => (
                  <li key={constraint} className={style.listItem}>
                    {constraint}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PageHelpWidget;
