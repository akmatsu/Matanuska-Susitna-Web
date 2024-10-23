-- CreateTable
CREATE TABLE "DocumentCollection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "DocumentCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Document_collections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Document_collections_AB_unique" ON "_Document_collections"("A", "B");

-- CreateIndex
CREATE INDEX "_Document_collections_B_index" ON "_Document_collections"("B");

-- AddForeignKey
ALTER TABLE "_Document_collections" ADD CONSTRAINT "_Document_collections_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Document_collections" ADD CONSTRAINT "_Document_collections_B_fkey" FOREIGN KEY ("B") REFERENCES "DocumentCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
