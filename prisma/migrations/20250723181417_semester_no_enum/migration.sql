/*
  Warnings:

  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `semester` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
DROP COLUMN "semester",
ADD COLUMN     "semester" SMALLINT NOT NULL,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("user_id", "year", "semester", "week");

-- DropEnum
DROP TYPE "Semester";
