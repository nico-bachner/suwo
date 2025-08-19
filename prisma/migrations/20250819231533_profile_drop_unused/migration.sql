/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `handle` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Profile_handle_key";

-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "bio",
DROP COLUMN "display_name",
DROP COLUMN "handle";
