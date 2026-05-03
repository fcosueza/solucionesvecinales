# Soluciones Vecinales

SolucionesVecinales es una aplicación que ayuda a gestionar comunidades de vecinos de forma eficiente y sencilla.

## Nomenclatura e Idioma

El código de la aplicación esta en inglés y español. El motivo de esto es que por un lado se han intentado facilitar su lectura para gente que entienda
en Inglés, por lo que prácticamente todas las variables y todos los comentarios se han traducido al español. Por otro lado, los componentes, sus argumentos y la mayoría de los tipos de han matentido en inglés, para que las llamadas a componentes o funciones sean más homogéneas, ya que hay muchas que se tienen que realizar en inglés porque vienen de librerías de JS o React.

## Ejecución en local

### Requisitos previos

- Node.js >= 24
- Una base de datos PostgreSQL accesible

### Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_bd"
   SESSION_SECRET="una-cadena-secreta-larga-y-aleatoria"
   ```

3. **Aplicar las migraciones de la base de datos**
   ```bash
   npm run db:migrate:dev
   ```

4. **Poblar la base de datos con datos de prueba** *(opcional)*
   ```bash
   npm run db:seed
   ```
   Los usuarios creados son:
   | Email | Contraseña | Rol |
   |---|---|---|
   | fran@gmail.com | 123451234512345 | admin |
   | juan@gmail.com | 123451234512345 | inquilino |
   | alberto@gmail.com | dsnojiaiojsdsnojiaiojs | inquilino |

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Deploy en Vercel (Next.js + Prisma)

Para evitar errores de Prisma en build/deploy:

1. Define estas variables en Vercel (Project Settings -> Environment Variables):
   - DATABASE_URL
   - SESSION_SECRET
2. Usa como Build Command: npm run vercel-build
3. Verifica que Install Command sea npm ci (o npm install)
4. Prisma Client se genera durante install/build, las migraciones se aplican con prisma migrate deploy y el seed se ejecuta en cada build

Scripts relevantes en este repositorio:

- npm run build -> prisma generate && next build
- npm run vercel-build -> prisma generate && prisma migrate deploy && prisma db seed && next build
- npm run db:migrate:deploy -> prisma migrate deploy
- npm run db:seed -> prisma db seed
