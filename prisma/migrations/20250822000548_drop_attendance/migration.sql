/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_user_id_fkey";

-- DropTable
DROP TABLE "public"."Attendance";
