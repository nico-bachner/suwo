-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('SEMESTER_1', 'SEMESTER_2');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id","role_name")
);

-- CreateTable
CREATE TABLE "Payment" (
    "user_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("user_id","created_at")
);

-- CreateTable
CREATE TABLE "Privilege" (
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Privilege_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Role" (
    "name" TEXT NOT NULL,
    "email" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "RolePrivilege" (
    "role_name" TEXT NOT NULL,
    "privilege_name" TEXT NOT NULL,

    CONSTRAINT "RolePrivilege_pkey" PRIMARY KEY ("role_name","privilege_name")
);

-- CreateTable
CREATE TABLE "UsuMembership" (
    "user_id" TEXT NOT NULL,
    "number" CHAR(7) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsuMembership_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "user_id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT,
    "display_name" TEXT,
    "instrument_name" TEXT,
    "bio" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "MailingListRecipient" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailingListRecipient_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "user_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" "Semester" NOT NULL,
    "week" SMALLINT NOT NULL
);

-- CreateTable
CREATE TABLE "Instrument" (
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 1,
    "condition" TEXT NOT NULL DEFAULT 'OK',
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "acquisition_price" DOUBLE PRECISION,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "acquisition_date" TIMESTAMP(3) NOT NULL,
    "acquisition_price" DOUBLE PRECISION,
    "composer" TEXT,
    "arranger" TEXT,
    "notes" TEXT,
    "lease_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_email_key" ON "Role"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuMembership_number_key" ON "UsuMembership"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_handle_key" ON "Profile"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "MailingListRecipient_email_key" ON "MailingListRecipient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_user_id_year_semester_week_key" ON "Attendance"("user_id", "year", "semester", "week");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_name_key" ON "Instrument"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_slug_key" ON "Instrument"("slug");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Role"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePrivilege" ADD CONSTRAINT "RolePrivilege_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Role"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePrivilege" ADD CONSTRAINT "RolePrivilege_privilege_name_fkey" FOREIGN KEY ("privilege_name") REFERENCES "Privilege"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuMembership" ADD CONSTRAINT "UsuMembership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_instrument_name_fkey" FOREIGN KEY ("instrument_name") REFERENCES "Instrument"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailingListRecipient" ADD CONSTRAINT "MailingListRecipient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
