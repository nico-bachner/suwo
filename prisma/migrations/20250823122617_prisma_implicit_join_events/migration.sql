/*
  Warnings:

  - You are about to drop the `EventAttendee` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "public"."_EventToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "public"."_EventToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Migrate data from EventAttendee to _EventToUser
INSERT INTO "public"."_EventToUser" ("A", "B")
SELECT "event_id", "user_id"
FROM "public"."EventAttendee";



-- DropForeignKey
ALTER TABLE "public"."EventAttendee" DROP CONSTRAINT "EventAttendee_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventAttendee" DROP CONSTRAINT "EventAttendee_user_id_fkey";

-- DropTable
DROP TABLE "public"."EventAttendee";

