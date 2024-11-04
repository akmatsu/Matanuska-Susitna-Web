-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "editorNotes" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reviewDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "editorNotes" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "editorNotes" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "DocumentCollection" ADD COLUMN     "editorNotes" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ExternalLink" ADD COLUMN     "reviewDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Highlight" ADD COLUMN     "editorNotes" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "reviewDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "editorNotes" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reviewDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "reviewDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reviewDate" TIMESTAMP(3);
