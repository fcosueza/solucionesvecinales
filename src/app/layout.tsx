import "../components/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SonnerToaster from "@/components/ui/SonnerToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soluciones Vecinales",
  description: "Aplicación para la gestión de comunidades de vecinos",
  authors: [{ name: "Francisco Sueza Rodríguez" }],
  icons: {
    icon: "favicon.ico"
  }
};

/**
 * Diseño raíz de la aplicación.
 * Envuelve todas las páginas y proporciona la estructura HTML base, fuentes y componentes globales.
 * Incluye el proveedor de notificaciones Sonner para mostrar toasts en toda la app.
 *
 * @component
 * @param children Contenido de las páginas anidadas
 * @returns El layout raíz renderizado
 */
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <SonnerToaster />
      </body>
    </html>
  );
}
