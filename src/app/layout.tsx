import "../components/global.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import SonnerToaster from "@/components/ui/SonnerToaster";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soluciones Vecinales",
  description: "Aplicación para la gestión de comunidades de vecinos",
  authors: [{ name: "Francisco Sueza Rodríguez" }],
  icons: {
    icon: "favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={roboto.className}>
      <body>
        {children}
        <SonnerToaster />
      </body>
    </html>
  );
}
