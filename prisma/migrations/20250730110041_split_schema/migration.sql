-- AlterTable
ALTER TABLE "public"."Equipment" ALTER COLUMN "condition" DROP NOT NULL,
ALTER COLUMN "condition" DROP DEFAULT,
ALTER COLUMN "acquisition_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."UsuMembership" ALTER COLUMN "number" SET DATA TYPE TEXT;
