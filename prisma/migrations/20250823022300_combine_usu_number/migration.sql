/*
  Warnings:

  - A unique constraint covering the columns `[usu_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "usu_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_usu_number_key" ON "public"."User"("usu_number");

UPDATE "public"."User" users
SET    "usu_number" = usu."number"
FROM   "public"."UsuMembership" usu
WHERE  usu."user_id" = users."id"
