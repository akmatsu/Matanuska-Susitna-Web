-- CreateTable
CREATE TABLE "_Community_districts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Community_districts_AB_unique" ON "_Community_districts"("A", "B");

-- CreateIndex
CREATE INDEX "_Community_districts_B_index" ON "_Community_districts"("B");

-- AddForeignKey
ALTER TABLE "_Community_districts" ADD CONSTRAINT "_Community_districts_A_fkey" FOREIGN KEY ("A") REFERENCES "AssemblyDistrict"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_districts" ADD CONSTRAINT "_Community_districts_B_fkey" FOREIGN KEY ("B") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
