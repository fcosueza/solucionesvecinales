import "../ui/global.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soluciones Vecinales",
  description: "Aplicación para la gestión de comunidades de vecinos",
  themeColor: "#000000",
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
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
