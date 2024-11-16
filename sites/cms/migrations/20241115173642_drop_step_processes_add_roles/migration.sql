/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Process` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_service_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_process_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" INTEGER DEFAULT 4;

-- DropTable
DROP TABLE "Process";

-- DropTable
DROP TABLE "Step";

-- DropEnum
DROP TYPE "UserRoleType";
