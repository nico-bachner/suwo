/*
  Warnings:

  - You are about to drop the `MailingListRecipient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MailingListRecipient" DROP CONSTRAINT "MailingListRecipient_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "mailing_list_preference" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "public"."MailingListRecipient";
