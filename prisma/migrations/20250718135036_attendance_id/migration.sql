-- AlterTable
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("user_id", "year", "semester", "week");

-- DropIndex
DROP INDEX "Attendance_user_id_year_semester_week_key";
