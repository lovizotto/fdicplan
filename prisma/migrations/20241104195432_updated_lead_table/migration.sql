/*
  Warnings:

  - You are about to drop the column `contact` on the `Leads` table. All the data in the column will be lost.
  - You are about to drop the column `lastHistory` on the `Leads` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Leads` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Leads` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Leads` table. All the data in the column will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `Leads` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Leads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityName` to the `Leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Leads` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Leads_email_key";

-- AlterTable
ALTER TABLE "Leads" DROP COLUMN "contact",
DROP COLUMN "lastHistory",
DROP COLUMN "name",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "cityName" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "contactPerson" TEXT,
ADD COLUMN     "eventName" TEXT,
ADD COLUMN     "nextDate" TIMESTAMP(3),
ADD COLUMN     "observations" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "clientes";

-- CreateTable
CREATE TABLE "Prospects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "lastHistory" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prospects_email_key" ON "Prospects"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Leads_companyName_key" ON "Leads"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Leads_phone_key" ON "Leads"("phone");
