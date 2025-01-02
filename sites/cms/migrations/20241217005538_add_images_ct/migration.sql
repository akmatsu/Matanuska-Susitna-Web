-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "file_id" TEXT,
    "file_filesize" INTEGER,
    "file_width" INTEGER,
    "file_height" INTEGER,
    "file_extension" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Image_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Image_title_idx" ON "Image"("title");

-- CreateIndex
CREATE INDEX "Image_description_idx" ON "Image"("description");

-- CreateIndex
CREATE UNIQUE INDEX "_Image_tags_AB_unique" ON "_Image_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Image_tags_B_index" ON "_Image_tags"("B");

-- AddForeignKey
ALTER TABLE "_Image_tags" ADD CONSTRAINT "_Image_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Image_tags" ADD CONSTRAINT "_Image_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
