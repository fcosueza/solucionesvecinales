# Soluciones Vecinales

Soluciones Vecinales is an application that helps manage residential communities in an efficient and simple way.

## Naming and Language

The application code is in both English and Spanish. The reason is that, on one hand, readability was improved for people who understand English, so most variables and comments were translated into Spanish. On the other hand, components, their arguments, and most types were kept in English so component/function calls stay more consistent, since many of them must be in English because they come from JS or React libraries.

## Installation

This section explains how to install the software required to run the application locally on both Microsoft Windows and Debian-based Linux distributions.

### Linux (Ubuntu/Debian)

1. **Update system packages**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Git, Node.js, and npm**

   ```bash
   sudo apt install -y git nodejs npm
   ```

   Verify the installation:

   ```bash
   node -v
   npm -v
   git --version
   ```

3. **Install PostgreSQL**

   ```bash
   sudo apt install -y postgresql postgresql-contrib
   sudo systemctl enable postgresql
   sudo systemctl start postgresql
   ```

4. **Clone the repository and install project dependencies**

   ```bash
   git clone <REPOSITORY_URL>
   cd solucionesvecinales
   npm install
   ```

### Windows

1. **Install Git**

   Download and install Git from: https://git-scm.com/download/win

2. **Install Node.js (includes npm)**

   Download and install Node.js LTS from: https://nodejs.org/

   Verify in PowerShell or CMD:

   ```powershell
   node -v
   npm -v
   git --version
   ```

3. **Install PostgreSQL**

   Download and install PostgreSQL from: https://www.postgresql.org/download/windows/

   During installation, keep these details:
   - user
   - password
   - port (default 5432)

4. **Clone the repository and install project dependencies**

   ```powershell
   git clone <REPOSITORY_URL>
   cd solucionesvecinales
   ```

## Run Locally

### Prerequisites

- Node.js >= 24
- An accessible PostgreSQL database

### Steps

1. **Set up environment variables**

   Create a `.env` file in the project root. You can use the following format as reference:

   ```env
   # Individual connection parameters (used to compose DATABASE_URL)
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=your_database_name
   DATABASE_USER=your_user
   DATABASE_PASSWORD=your_password

   # Database connection URL (can use the variables above)
   DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}

   # Secret key used to sign and verify JWT session tokens.
   # It must be a long random string. You can generate it with:
   #   Linux/macOS/Git Bash:  openssl rand -base64 32
   #   Windows (PowerShell):  [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   SESSION_SECRET=your-long-random-secret-key
   ```

   > **Important:** the `.env` file is included in `.gitignore` and must never be pushed to the repository.
   > In production (Vercel), these variables are configured in the Vercel panel, and
   > `DATABASE_URL` must be a literal URL ending with `?sslmode=require`, because Vercel
   > does not expand `${VAR}` syntax.

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Apply database migrations**

   ```bash
   npm run db:migrate:dev
   ```

4. **Seed the database with test data** _(optional)_

   ```bash
   npm run db:seed
   ```

   Sample users created by seed (all with the same password):
   | Email | Password | Role |
   |---|---|---|
   | webadmin@vecinos.local | VecinosSeguro2026! | adminWeb |
   | lucia.martinez@vecinos.local | VecinosSeguro2026! | admin |
   | alvaro.santos@vecinos.local | VecinosSeguro2026! | tenant |

   > The seed creates more users for multiple communities; the ones above are quick-access reference accounts.

5. **Start the development server**

   Start the application in development mode with hot reload so you can test changes instantly while coding.

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

6. **Generate a production build**

   Compile the application in production mode and validate that the whole project can be built correctly before deployment.

   ```bash
   npm run build
   ```

7. **Start the production server**

   Start the production build generated in the previous step, simulating real deployment behavior.

   ```bash
   npm run start
   ```

## Docker Compose (without Dockerfile)

### Install Docker

#### Linux (Ubuntu/Debian)

1. **Install Docker Engine**

   ```bash
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

2. **Add your user to the docker group** _(so `sudo` is not needed for every command)_

   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Verify the installation**

   ```bash
   docker --version
   docker compose version
   ```

#### Windows

1. **Install Docker Desktop**

   Download and install Docker Desktop from: https://www.docker.com/products/docker-desktop/

   During installation, make sure to enable integration with WSL 2 (recommended) or Hyper-V.

2. **Verify in PowerShell or CMD**

   ```powershell
   docker --version
   docker compose version
   ```

   > **Note:** On Windows, Docker Desktop includes Docker Compose. No separate installation is needed.

---

### Run with Docker Compose

The project includes a [docker-compose.yml](docker-compose.yml) file with profiles for development and production,
plus PostgreSQL. Playwright is integrated in the development profile (`app-dev`).

- The app is reachable from your browser outside Docker at: [http://localhost:3000](http://localhost:3000)
- Migrations and seed run automatically when the app starts
- PostgreSQL data and uploads are persisted in Docker volumes

### Optional variables

You can customize credentials and ports by exporting variables in your shell before starting services:

**Linux/macOS/Git Bash:**

```bash
export POSTGRES_DB=solucionesvecinales
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_PORT=5432
export SESSION_SECRET=your_session_secret
```

**Windows (PowerShell):**

```powershell
$env:POSTGRES_DB="solucionesvecinales"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="postgres"
$env:POSTGRES_PORT="5432"
$env:SESSION_SECRET="your_session_secret"
```

**Windows (CMD):**

```cmd
set POSTGRES_DB=solucionesvecinales
set POSTGRES_USER=postgres
set POSTGRES_PASSWORD=postgres
set POSTGRES_PORT=5432
set SESSION_SECRET=your_session_secret
```

### Start development environment

```bash
docker compose --profile dev up
```

This profile mounts the project code inside the container and runs:

- `npm install`
- `npx playwright install --with-deps`
- `npm run db:migrate:deploy`
- `npm run db:seed`
- `npm run dev -- -H 0.0.0.0 -p 3000`

### Start production environment

```bash
docker compose --profile prod up
```

This profile runs inside the container:

- `npm ci`
- `npm run db:migrate:deploy`
- `npm run db:seed`
- `npm run build`
- `npm run start -- -H 0.0.0.0 -p 3000`

### Run Playwright E2E tests (optional)

With the `dev` environment up, run tests inside `app-dev`:

```bash
docker compose --profile dev exec app-dev npm run test:e2e
```

### Stop and clean up

```bash
docker compose down
```

To also remove volumes (database and caches):

```bash
docker compose down -v
```

---

## Deploy on Vercel (Next.js + Prisma)

To avoid Prisma errors during build/deploy:

1. Define these variables in Vercel (Project Settings -> Environment Variables):
   - DATABASE_URL
   - SESSION_SECRET
2. Use this Build Command: npm run vercel-build
3. Verify Install Command is npm ci (or npm install)
4. Prisma Client is generated during install/build, migrations are applied with prisma migrate deploy, and seed runs on every build

Relevant scripts in this repository:

- npm run build -> prisma generate && next build
- npm run vercel-build -> prisma generate && prisma migrate deploy && prisma db seed && next build
- npm run db:migrate:deploy -> prisma migrate deploy
- npm run db:seed -> prisma db seed

## TODO

- Translate all code to English
- Make the app reponsive for small devices (high priority)
- Refactor reservation system allowing up to 3 reservations per user
- Refactor server functions (if needed)
- Redesign some forms UI
- WebAdmin needs to be able to add elements
- Add missing e2e tests
- Refactor inline help to make it more helpful
- Increase a11y
