/*
  Warnings:

  - You are about to drop the column `instrument_id` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_instrument_id_fkey";

-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "instrument_id";

-- CreateTable
CREATE TABLE "public"."UserInstrument" (
    "user_id" TEXT NOT NULL,
    "instrument_id" TEXT NOT NULL,

    CONSTRAINT "UserInstrument_pkey" PRIMARY KEY ("user_id","instrument_id")
);

-- AddForeignKey
ALTER TABLE "public"."UserInstrument" ADD CONSTRAINT "UserInstrument_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserInstrument" ADD CONSTRAINT "UserInstrument_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "public"."Instrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
