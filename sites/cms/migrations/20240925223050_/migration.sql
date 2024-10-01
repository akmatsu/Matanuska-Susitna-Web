-- CreateTable
CREATE TABLE "Taggable" (
    "id" TEXT NOT NULL,
    "tag" TEXT,
    "taggableType" TEXT,
    "taggableId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Taggable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Service_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Taggable_tag_idx" ON "Taggable"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_tags_AB_unique" ON "_Service_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_tags_B_index" ON "_Service_tags"("B");

-- AddForeignKey
ALTER TABLE "Taggable" ADD CONSTRAINT "Taggable_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Taggable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
