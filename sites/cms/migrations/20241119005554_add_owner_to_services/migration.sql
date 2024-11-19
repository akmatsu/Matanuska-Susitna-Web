-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "owner" TEXT;

-- CreateIndex
CREATE INDEX "Service_owner_idx" ON "Service"("owner");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
