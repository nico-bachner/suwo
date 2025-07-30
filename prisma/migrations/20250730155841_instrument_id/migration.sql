/*
  Warnings:

  - You are about to drop the column `instrument_name` on the `PracticePart` table. All the data in the column will be lost.
  - You are about to drop the column `instrument_name` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[instrument_id,library_id,variant]` on the table `PracticePart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instrument_id` to the `PracticePart` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."PracticePart_instrument_name_library_id_variant_key";

-- AlterTable
ALTER TABLE "public"."PracticePart" DROP COLUMN "instrument_name",
ADD COLUMN     "instrument_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "instrument_name",
ADD COLUMN     "instrument_id" TEXT;

-- CreateTable
CREATE TABLE "public"."Instrument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_name_key" ON "public"."Instrument"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_slug_key" ON "public"."Instrument"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PracticePart_instrument_id_library_id_variant_key" ON "public"."PracticePart"("instrument_id", "library_id", "variant");

-- AddForeignKey
ALTER TABLE "public"."PracticePart" ADD CONSTRAINT "PracticePart_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "public"."Instrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "public"."Instrument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
