/*
  Warnings:

  - You are about to drop the column `primaryAction` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `primaryActionLabel` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "primaryAction",
DROP COLUMN "primaryActionLabel",
ADD COLUMN     "actionLabel" TEXT,
ADD COLUMN     "actionUrl" TEXT;
