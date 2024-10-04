-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "primaryContact" TEXT;

-- CreateIndex
CREATE INDEX "Service_primaryContact_idx" ON "Service"("primaryContact");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_primaryContact_fkey" FOREIGN KEY ("primaryContact") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
