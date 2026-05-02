# Soluciones Vecinales

SolucionesVecinales es una aplicación que ayuda a gestionar comunidades de vecinos de forma eficiente y sencilla.

## Deploy en Vercel (Next.js + Prisma)

Para evitar errores de Prisma en build/deploy:

1. Define estas variables en Vercel (Project Settings -> Environment Variables):
   - DATABASE_URL
   - SESSION_SECRET
2. Usa como Build Command: npm run vercel-build
3. Verifica que Install Command sea npm ci (o npm install)
4. Prisma Client se genera durante install/build y las migraciones se aplican con prisma migrate deploy

Scripts relevantes en este repositorio:

- npm run build -> prisma generate && next build
- npm run vercel-build -> prisma generate && prisma migrate deploy && next build
- npm run db:migrate:deploy -> prisma migrate deploy

## Nomenclatura e Idioma

Se ha intentado poner en Castellano el mayor número de elementos posibles, aunque hay ciertos elementos que se han mantenido en inglés para evitar incompatibilidades
y para que sean más homogéneo.

Así, se han mantenido los tipos definidos en inglés, para que concuerden con el resto de tipos empleados en al aplicación y que están en ingles ya que provienen de Typescript.
Además, se han mantenido en inglés también los componentes y los parámetros (props) que usan, para mantener la homogeneidad con las etiquetas de HTML que están en ingles, así como los atributos
de estas etiquetas, los cuales algunos se mapean directamente desde los props. Si se ponen en Castellano, habrá que realizar cambios que solo añadirían complejidad y ruido al código.
