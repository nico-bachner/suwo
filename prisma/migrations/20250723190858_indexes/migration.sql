-- CreateIndex
CREATE INDEX "Attendance_year_semester_week_idx" ON "Attendance"("year" DESC, "semester" DESC, "week" DESC);

-- CreateIndex
CREATE INDEX "Instrument_name_idx" ON "Instrument"("name" ASC);

-- CreateIndex
CREATE INDEX "Profile_given_name_family_name_idx" ON "Profile"("given_name" ASC, "family_name" ASC);
