/*
  Warnings:

  - You are about to drop the column `expires_at` on the `VerificationToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "expires_at";
