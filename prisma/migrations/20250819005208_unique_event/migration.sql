/*
  Warnings:

  - A unique constraint covering the columns `[name,starts_at]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_name_starts_at_key" ON "public"."Event"("name", "starts_at");
