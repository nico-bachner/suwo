/*
  Warnings:

  - You are about to drop the `Instrument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PracticePart" DROP CONSTRAINT "PracticePart_instrument_name_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_instrument_name_fkey";

-- DropTable
DROP TABLE "public"."Instrument";
