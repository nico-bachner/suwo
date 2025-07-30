/*
  Warnings:

  - You are about to drop the column `slug` on the `Instrument` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Instrument_slug_key";

-- AlterTable
ALTER TABLE "public"."Instrument" DROP COLUMN "slug";
