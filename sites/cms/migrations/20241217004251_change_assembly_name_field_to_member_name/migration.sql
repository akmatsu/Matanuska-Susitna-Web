/*
  Warnings:

  - You are about to drop the column `name` on the `AssemblyDistrict` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AssemblyDistrict" DROP COLUMN "name",
ADD COLUMN     "memberName" TEXT NOT NULL DEFAULT '';
