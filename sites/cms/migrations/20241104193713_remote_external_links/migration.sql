/*
  Warnings:

  - You are about to drop the column `reviewDate` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `reviewDate` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `reviewDate` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `reviewDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ExternalLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "reviewDate";

-- AlterTable
ALTER TABLE "Highlight" ADD COLUMN     "reviewDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "reviewDate";

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "reviewDate";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "reviewDate";

-- DropTable
DROP TABLE "ExternalLink";
