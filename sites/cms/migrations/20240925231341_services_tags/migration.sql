/*
  Warnings:

  - You are about to drop the `Taggable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Taggable" DROP CONSTRAINT "Taggable_tag_fkey";

-- DropForeignKey
ALTER TABLE "_Service_tags" DROP CONSTRAINT "_Service_tags_B_fkey";

-- DropTable
DROP TABLE "Taggable";

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
