"use client";

import { useEffect } from "react";

/**
 * Este componente se asegura de que una página tenga el scroll completo hacia la parte superior
 * para evitar que haya elementos que nos vean correctamente al navegar entre páginas.
 * 
 * @returns null, ya que este componente no renderiza nada visualmente.
 */
const ScrollToTopOnMount = (): null => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return null;
};

export default ScrollToTopOnMount;
