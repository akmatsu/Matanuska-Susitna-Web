-- AlterTable
ALTER TABLE "DocumentCollection" ADD COLUMN     "owner" TEXT;

-- CreateIndex
CREATE INDEX "DocumentCollection_owner_idx" ON "DocumentCollection"("owner");

-- AddForeignKey
ALTER TABLE "DocumentCollection" ADD CONSTRAINT "DocumentCollection_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
