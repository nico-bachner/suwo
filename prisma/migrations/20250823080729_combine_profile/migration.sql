-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "family_name" TEXT,
ADD COLUMN     "given_name" TEXT;

UPDATE "public"."User" users
SET    "given_name" = p."given_name" 
FROM   "public"."Profile" p
WHERE  p."user_id" = users."id";

UPDATE "public"."User" users
SET    "family_name" = p."family_name" 
FROM   "public"."Profile" p
WHERE  p."user_id" = users."id";