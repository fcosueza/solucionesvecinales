# Soluciones Vecinales

SolucionesVecinales es una aplicación que ayuda a gestionar comunidades de vecinos de forma eficiente y sencilla.

## Nomenclatura e Idioma

El código de la aplicación esta en inglés y español. El motivo de esto es que por un lado se han intentado facilitar su lectura para gente que entienda
en Inglés, por lo que prácticamente todas las variables y todos los comentarios se han traducido al español. Por otro lado, los componentes, sus argumentos y la mayoría de los tipos de han matentido en inglés, para que las llamadas a componentes o funciones sean más homogéneas, ya que hay muchas que se tienen que realizar en inglés porque vienen de librerías de JS o React.

## Instalación

En esta sección se explica cómo instalar el software necesario para ejecutar la aplicación en local tanto para sistemas Microsoft Windows como para distribuciones Linux basadas en Debian.

### Linux (Ubuntu/Debian)

1. **Actualizar paquetes del sistema**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Instalar Git, Node.js y npm**

   ```bash
   sudo apt install -y git nodejs npm
   ```

   Verifica la instalación:

   ```bash
   node -v
   npm -v
   git --version
   ```

3. **Instalar PostgreSQL**

   ```bash
   sudo apt install -y postgresql postgresql-contrib
   sudo systemctl enable postgresql
   sudo systemctl start postgresql
   ```

4. **Clonar el repositorio e instalar dependencias del proyecto**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd solucionesvecinales
   npm install
   ```

### Windows

1. **Instalar Git**

   Descarga e instala Git desde: https://git-scm.com/download/win

2. **Instalar Node.js (incluye npm)**

   Descarga e instala Node.js LTS desde: https://nodejs.org/

   Verifica en PowerShell o CMD:

   ```powershell
   node -v
   npm -v
   git --version
   ```

3. **Instalar PostgreSQL**

   Descarga e instala PostgreSQL desde: https://www.postgresql.org/download/windows/

   Durante la instalación, guarda estos datos:
   - usuario
   - contraseña
   - puerto (por defecto 5432)

4. **Clonar el repositorio e instalar dependencias del proyecto**

   ```powershell
   git clone <URL_DEL_REPOSITORIO>
   cd solucionesvecinales
   npm install
   ```

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

   Crea un archivo `.env` en la raíz del proyecto. Puedes usar el siguiente formato como referencia:

   ```env
   # Parámetros individuales de conexión (usados para componer DATABASE_URL)
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=nombre_de_tu_base_de_datos
   DATABASE_USER=tu_usuario
   DATABASE_PASSWORD=tu_contraseña

   # URL de conexión a la base de datos (puede usar las variables anteriores)
   DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}

   # Clave secreta para firmar y verificar los tokens de sesión JWT.
   # Debe ser una cadena larga y aleatoria. Puedes generarla con:
   #   Linux/macOS/Git Bash:  openssl rand -base64 32
   #   Windows (PowerShell):  [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   SESSION_SECRET=tu-clave-secreta-larga-y-aleatoria
   ```

   > **Importante:** el archivo `.env` está incluido en `.gitignore` y nunca debe subirse al repositorio.
   > En producción (Vercel), estas variables se configuran desde el panel de Vercel y la
   > `DATABASE_URL` debe ser una URL literal con `?sslmode=require` al final, ya que Vercel
   > no expande la sintaxis `${VAR}`.

3. **Aplicar las migraciones de la base de datos**

   ```bash
   npm run db:migrate:dev
   ```

4. **Poblar la base de datos con datos de prueba** _(opcional)_

   ```bash
   npm run db:seed
   ```

   Usuarios de ejemplo creados por seed (todos con la misma contraseña):
   | Email | Contraseña | Rol |
   |---|---|---|
   | webadmin@vecinos.local | VecinosSeguro2026! | adminWeb |
   | lucia.martinez@vecinos.local | VecinosSeguro2026! | admin |
   | alvaro.santos@vecinos.local | VecinosSeguro2026! | inquilino |

   > El seed crea mas usuarios para varias comunidades; los anteriores son cuentas de referencia para acceso rapido.

5. **Iniciar el servidor de desarrollo**

   Levanta la aplicación en modo desarrollo con recarga en caliente para que puedas probar cambios al instante mientras programas.

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

6. **Generar build de producción**

   Compila la aplicación en modo producción y valida que todo el proyecto puede construirse correctamente antes de desplegar.

   ```bash
   npm run build
   ```

7. **Iniciar el servidor en producción**

   Arranca la build de producción generada en el paso anterior, simulando el comportamiento real del entorno de despliegue.

   ```bash
   npm run start
   ```

## Docker Compose (sin Dockerfile)

### Instalación de Docker

#### Linux (Ubuntu/Debian)

1. **Instalar Docker Engine**

   ```bash
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

2. **Añadir tu usuario al grupo docker** _(para no necesitar `sudo` en cada comando)_

   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Verificar la instalación**

   ```bash
   docker --version
   docker compose version
   ```

#### Windows

1. **Instalar Docker Desktop**

   Descarga e instala Docker Desktop desde: https://www.docker.com/products/docker-desktop/

   Durante la instalación asegúrate de habilitar la integración con WSL 2 (recomendado) o Hyper-V.

2. **Verificar en PowerShell o CMD**

   ```powershell
   docker --version
   docker compose version
   ```

   > **Nota:** En Windows, Docker Desktop incluye Docker Compose. No es necesario instalarlo por separado.

---

### Ejecución con Docker Compose

Se incluye un archivo [docker-compose.yml](docker-compose.yml) con perfiles para desarrollo y producción,
además de PostgreSQL. Playwright queda integrado en el perfil de desarrollo (`app-dev`).

- La app queda accesible desde tu navegador fuera de Docker en: [http://localhost:3000](http://localhost:3000)
- Se aplican migraciones y seed automáticamente al arrancar la app
- Los datos de PostgreSQL y uploads quedan persistidos en volúmenes Docker

### Variables opcionales

Puedes personalizar credenciales y puertos exportando variables en tu shell antes de levantar los servicios:

**Linux/macOS/Git Bash:**

```bash
export POSTGRES_DB=solucionesvecinales
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_PORT=5432
export SESSION_SECRET=tu_clave_de_sesion
```

**Windows (PowerShell):**

```powershell
$env:POSTGRES_DB="solucionesvecinales"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="postgres"
$env:POSTGRES_PORT="5432"
$env:SESSION_SECRET="tu_clave_de_sesion"
```

**Windows (CMD):**

```cmd
set POSTGRES_DB=solucionesvecinales
set POSTGRES_USER=postgres
set POSTGRES_PASSWORD=postgres
set POSTGRES_PORT=5432
set SESSION_SECRET=tu_clave_de_sesion
```

### Levantar entorno de desarrollo

```bash
docker compose --profile dev up
```

Este perfil monta el código del proyecto dentro del contenedor y ejecuta:

- `npm install`
- `npx playwright install --with-deps`
- `npm run db:migrate:deploy`
- `npm run db:seed`
- `npm run dev -- -H 0.0.0.0 -p 3000`

### Levantar entorno de producción

```bash
docker compose --profile prod up
```

Este perfil ejecuta dentro del contenedor:

- `npm ci`
- `npm run db:migrate:deploy`
- `npm run db:seed`
- `npm run build`
- `npm run start -- -H 0.0.0.0 -p 3000`

### Ejecutar tests E2E con Playwright (opcional)

Con el entorno `dev` levantado, ejecuta los tests dentro de `app-dev`:

```bash
docker compose --profile dev exec app-dev npm run test:e2e
```

### Parar y limpiar

```bash
docker compose down
```

Para eliminar también los volúmenes (base de datos y cachés):

```bash
docker compose down -v
```

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
