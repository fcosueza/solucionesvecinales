-- CreateEnum
CREATE TYPE "IncidentState" AS ENUM ('created', 'processing', 'solved');

-- CreateEnum
CREATE TYPE "RequestState" AS ENUM ('pending', 'approved', 'denied');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('tenant', 'admin', 'webAdmin');

-- CreateTable
CREATE TABLE "Area" (
    "name" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("name","community")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("name","email","createdAt")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("user")
);

-- CreateTable
CREATE TABLE "Incident" (
    "community" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "state" "IncidentState" NOT NULL DEFAULT 'created',

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("community","user","date")
);

-- CreateTable
CREATE TABLE "Message" (
    "community" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("createdAt","community")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("user","community")
);

-- CreateTable
CREATE TABLE "Request" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "state" "RequestState" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Request_pkey" PRIMARY KEY ("user","community")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "user" TEXT NOT NULL,
    "community" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("user","community","area")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'tenant',
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_area_community_fkey" FOREIGN KEY ("area", "community") REFERENCES "Area"("name", "community") ON DELETE CASCADE ON UPDATE CASCADE;
