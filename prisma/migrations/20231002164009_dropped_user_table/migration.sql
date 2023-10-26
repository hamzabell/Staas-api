/*
  Warnings:

  - You are about to drop the column `userId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_userId_fkey";

-- DropIndex
DROP INDEX "Device_userId_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "secret" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "Device_email_key" ON "Device"("email");
