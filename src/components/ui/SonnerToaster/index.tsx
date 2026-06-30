"use client";

import { Toaster } from "sonner";

/**
 * Render the global container for Sonner notifications (toasts).
 *
 * This component must be mounted only once, usually in the root layout,
 * so that any part of the application can show toast type notifications.
 *
 * @returns The Toaster component configured for the entire app.
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
