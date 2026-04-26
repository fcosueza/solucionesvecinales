"use client";

import { Toaster } from "sonner";

interface Props {
  className?: string;
}

/**
 * Renderiza el contenedor global de notificaciones (toasts) de Sonner.
 *
 * Este componente debe montarse una sola vez, normalmente en el layout raíz,
 * para que cualquier parte de la aplicación pueda mostrar notificaciones de tipo toast.
 *
 * @param props - Props del componente SonnerToaster.
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 * @returns El componente Toaster configurado para toda la app.
 */

const SonnerToaster = ({ className = "" }: Props): React.ReactNode => {
  return (
    <div className={className}>
      <Toaster
        // Configuración visual y de comportamiento por defecto para todos los toasts.
        position="top-right"
        closeButton
        richColors
        toastOptions={{
          duration: 4000
        }}
      />
    </div>
  );
};

export default SonnerToaster;
