/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `given_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "given_name" SET NOT NULL;

-- DropTable
DROP TABLE "public"."Profile";
