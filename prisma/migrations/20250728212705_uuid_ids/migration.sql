/*
  Warnings:

  - The primary key for the `Privilege` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RolePrivilege` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `privilege_name` on the `RolePrivilege` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `RolePrivilege` table. All the data in the column will be lost.
  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_name` on the `UserRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Privilege` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Privilege` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `privilege_id` to the `RolePrivilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `RolePrivilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolePrivilege" DROP CONSTRAINT "RolePrivilege_privilege_name_fkey";

-- DropForeignKey
ALTER TABLE "RolePrivilege" DROP CONSTRAINT "RolePrivilege_role_name_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_role_name_fkey";

-- AlterTable
ALTER TABLE "Privilege" DROP CONSTRAINT "Privilege_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Privilege_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RolePrivilege" DROP CONSTRAINT "RolePrivilege_pkey",
DROP COLUMN "privilege_name",
DROP COLUMN "role_name",
ADD COLUMN     "privilege_id" TEXT NOT NULL,
ADD COLUMN     "role_id" TEXT NOT NULL,
ADD CONSTRAINT "RolePrivilege_pkey" PRIMARY KEY ("role_id", "privilege_id");

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
DROP COLUMN "role_name",
ADD COLUMN     "role_id" TEXT NOT NULL,
ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "Privilege_name_key" ON "Privilege"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "RolePrivilege" ADD CONSTRAINT "RolePrivilege_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePrivilege" ADD CONSTRAINT "RolePrivilege_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
