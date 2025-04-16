import "../ui/global.css";

/**
 * Componente RootLayout
 *
 * Componente que muestra el layout principal, estableciendo la etiqueta
 * html así como la cabecera.
 *
 * @param children Componentes que se mostrarán en el cuerpo de la página
 * @returns Código HTML con las etiquetas html, head y body
 */

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Aplicación para la gestión de comunidades de vecinos" />

        <link rel="icon" href="favicon.ico" />

        <title>Soluciones Vecinales</title>
      </head>

      <body>{children}</body>
    </html>
  );
}
