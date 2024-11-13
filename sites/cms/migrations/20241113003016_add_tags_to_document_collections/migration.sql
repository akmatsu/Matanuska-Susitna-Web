-- CreateTable
CREATE TABLE "_DocumentCollection_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DocumentCollection_tags_AB_unique" ON "_DocumentCollection_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_DocumentCollection_tags_B_index" ON "_DocumentCollection_tags"("B");

-- AddForeignKey
ALTER TABLE "_DocumentCollection_tags" ADD CONSTRAINT "_DocumentCollection_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "DocumentCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentCollection_tags" ADD CONSTRAINT "_DocumentCollection_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
