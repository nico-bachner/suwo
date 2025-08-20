/*
  Warnings:

  - You are about to drop the `EventAttendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."EventAttendance" DROP CONSTRAINT "EventAttendance_event_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventAttendance" DROP CONSTRAINT "EventAttendance_user_id_fkey";

-- DropTable
DROP TABLE "public"."EventAttendance";

-- CreateTable
CREATE TABLE "public"."EventAttendee" (
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventAttendee_pkey" PRIMARY KEY ("event_id","user_id")
);

-- AddForeignKey
ALTER TABLE "public"."EventAttendee" ADD CONSTRAINT "EventAttendee_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventAttendee" ADD CONSTRAINT "EventAttendee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
