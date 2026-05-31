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
 * Application root layout.
 * It wraps all pages and provides the base HTML structure, fonts, and global components.
 * Includes the Sonner notification provider to display toasts throughout the app.
 *
 * @component
 * @param children Content of nested pages
 * @returns El root layout rendering
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
