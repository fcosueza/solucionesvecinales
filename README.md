# Soluciones Vecinales

Soluciones Vecinales is an application that helps manage residential communities in a simple and efficient way.

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

   During installation, make note of these details:
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

   Sample users created by the seed (all with the same password):
   | Email | Password | Role |
   |---|---|---|
   | webadmin@vecinos.local | VecinosSeguro2026! | adminWeb |
   | lucia.martinez@vecinos.local | VecinosSeguro2026! | admin |
   | alvaro.santos@vecinos.local | VecinosSeguro2026! | tenant |

   > The seed creates additional users for multiple communities; the ones above are quick-access reference accounts.

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

---

## Deploy on Vercel (Next.js + Prisma)

Vercel builds do not modify the database. Applying migrations from every preview or production build can cause concurrent deployments to contend for Prisma's PostgreSQL advisory lock.

1. Define these variables in Vercel (Project Settings -> Environment Variables):
   - DATABASE_URL
   - SESSION_SECRET
2. Use this Build Command: npm run vercel-build
3. Verify Install Command is npm ci (or npm install)
4. Before deploying a release that contains migrations, run the following once from a serialized CI release job with the production `DATABASE_URL`:

   ```bash
   npm run db:migrate:deploy
   ```

   Do not run migrations or seed data during Vercel builds. Preview deployments should use a separate database when they require database changes.

Relevant scripts in this repository:

- npm run build -> prisma generate && next build
- npm run vercel-build -> prisma generate && next build
- npm run db:migrate:deploy -> prisma migrate deploy
- npm run db:seed -> prisma db seed

## TODO

- ~~Translate all code to English~~
- Make the app responsive for small devices (high priority)
- Refactor the reservation system to allow up to 3 reservations per user
- Refactor server functions (if needed)
- Redesign some forms UI
- WebAdmin needs to be able to add elements
- Add missing e2e tests
- Refactor inline help to make it more helpful
- Increase a11y
