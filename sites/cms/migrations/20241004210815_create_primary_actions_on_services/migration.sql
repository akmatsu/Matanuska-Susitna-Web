-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "primaryAction" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "primaryActionLabel" TEXT NOT NULL DEFAULT '';
