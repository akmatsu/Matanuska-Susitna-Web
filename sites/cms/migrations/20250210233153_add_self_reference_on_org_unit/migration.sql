-- AlterTable
ALTER TABLE "OrgUnit" ADD COLUMN     "parent" TEXT;

-- CreateIndex
CREATE INDEX "OrgUnit_parent_idx" ON "OrgUnit"("parent");

-- AddForeignKey
ALTER TABLE "OrgUnit" ADD CONSTRAINT "OrgUnit_parent_fkey" FOREIGN KEY ("parent") REFERENCES "OrgUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
