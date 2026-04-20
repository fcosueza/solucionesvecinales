"use client";

import { Toaster } from "sonner";

const SonnerToaster = (): React.ReactNode => {
  return (
    <Toaster
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        duration: 4000
      }}
    />
  );
};

export default SonnerToaster;
