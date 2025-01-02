-- AlterTable
ALTER TABLE "AssemblyDistrict" ADD COLUMN     "photo" TEXT;

-- CreateIndex
CREATE INDEX "AssemblyDistrict_photo_idx" ON "AssemblyDistrict"("photo");

-- AddForeignKey
ALTER TABLE "AssemblyDistrict" ADD CONSTRAINT "AssemblyDistrict_photo_fkey" FOREIGN KEY ("photo") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
