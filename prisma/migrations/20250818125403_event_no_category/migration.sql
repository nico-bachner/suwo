/*
  Warnings:

  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "category",
ADD COLUMN     "type" TEXT;
