"use client";

import { Toaster } from "sonner";

interface Props {}

/**
 * Renderiza el contenedor global de notificaciones (toasts) de Sonner.
 *
 * Este componente debe montarse una sola vez, normalmente en el layout raíz,
 * para que cualquier parte de la aplicación pueda mostrar notificaciones de tipo toast.
 *
 * @returns El componente Toaster configurado para toda la app.
 */

const SonnerToaster = ({}: Props): React.ReactNode => {
  return (
    <div>
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
