/*
  Warnings:

  - You are about to drop the column `link` on the `Highlight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Highlight" DROP COLUMN "link",
ADD COLUMN     "externalLink" TEXT,
ADD COLUMN     "internalLink" TEXT,
ADD COLUMN     "message" TEXT NOT NULL DEFAULT '';
