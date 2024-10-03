/*
  Warnings:

  - You are about to drop the column `message` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `customText` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Step` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "message",
ADD COLUMN     "body" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "customText",
ADD COLUMN     "body" TEXT;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "content",
ADD COLUMN     "body" TEXT;
