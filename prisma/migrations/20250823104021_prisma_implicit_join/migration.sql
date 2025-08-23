/*
  Warnings:

  - You are about to drop the `UserInstrument` table. If the table is not empty, all the data it contains will be lost.

*/


-- CreateTable
CREATE TABLE "public"."_InstrumentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InstrumentToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InstrumentToUser_B_index" ON "public"."_InstrumentToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."_InstrumentToUser" ADD CONSTRAINT "_InstrumentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Instrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_InstrumentToUser" ADD CONSTRAINT "_InstrumentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrate data from UserInstrument to _InstrumentToUser
INSERT INTO "public"."_InstrumentToUser" ("A", "B")
SELECT "instrument_id", "user_id"
FROM "public"."UserInstrument";

-- DropForeignKey
ALTER TABLE "public"."UserInstrument" DROP CONSTRAINT "UserInstrument_instrument_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserInstrument" DROP CONSTRAINT "UserInstrument_user_id_fkey";

-- DropTable
DROP TABLE "public"."UserInstrument";