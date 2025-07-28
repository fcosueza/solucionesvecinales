import "../ui/global.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Francisco Sueza Rodríguez" />
        <meta name="description" content="Aplicación para la gestión de comunidades de vecinos" />

        <link rel="icon" href="favicon.ico" />

        <title>Soluciones Vecinales</title>
      </head>

      <body>{children}</body>
    </html>
  );
}
