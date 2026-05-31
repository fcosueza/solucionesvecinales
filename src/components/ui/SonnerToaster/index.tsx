"use client";

import { Toaster } from "sonner";

/**
 * Renderiza el contenedor global de notificaciones (toasts) de Sonner.
 *
 * This component must be mounted only once, usually in the root layout,
 * so that any part of the application can show toast type notifications.
 *
 * @returns El Toaster component configured for the entire app.
 */

const SonnerToaster = (): React.ReactNode => {
  return (
    <div>
      <Toaster
        // Default visual and behavioral settings for all toasts.
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
