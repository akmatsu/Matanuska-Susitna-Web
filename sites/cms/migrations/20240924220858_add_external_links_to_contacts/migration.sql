-- CreateTable
CREATE TABLE "ExternalLink" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Service_externalLinks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Service_externalLinks_AB_unique" ON "_Service_externalLinks"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_externalLinks_B_index" ON "_Service_externalLinks"("B");

-- AddForeignKey
ALTER TABLE "_Service_externalLinks" ADD CONSTRAINT "_Service_externalLinks_A_fkey" FOREIGN KEY ("A") REFERENCES "ExternalLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_externalLinks" ADD CONSTRAINT "_Service_externalLinks_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
