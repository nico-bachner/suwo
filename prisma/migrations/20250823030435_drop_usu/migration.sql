/*
  Warnings:

  - You are about to drop the `UsuMembership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UsuMembership" DROP CONSTRAINT "UsuMembership_user_id_fkey";

-- DropTable
DROP TABLE "public"."UsuMembership";
