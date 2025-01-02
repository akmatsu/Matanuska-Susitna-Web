-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "publishAt" TIMESTAMP(3),
    "unpublishAt" TIMESTAMP(3),
    "reviewDate" TIMESTAMP(3),
    "slug" TEXT NOT NULL DEFAULT '',
    "owner" TEXT,
    "mapId" TEXT NOT NULL DEFAULT '',
    "heroImage" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Community_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Community_userGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Community_contacts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Community_services" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_slug_key" ON "Community"("slug");

-- CreateIndex
CREATE INDEX "Community_title_idx" ON "Community"("title");

-- CreateIndex
CREATE INDEX "Community_description_idx" ON "Community"("description");

-- CreateIndex
CREATE INDEX "Community_owner_idx" ON "Community"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "_Community_tags_AB_unique" ON "_Community_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Community_tags_B_index" ON "_Community_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Community_userGroups_AB_unique" ON "_Community_userGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_Community_userGroups_B_index" ON "_Community_userGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Community_contacts_AB_unique" ON "_Community_contacts"("A", "B");

-- CreateIndex
CREATE INDEX "_Community_contacts_B_index" ON "_Community_contacts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Community_services_AB_unique" ON "_Community_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Community_services_B_index" ON "_Community_services"("B");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_tags" ADD CONSTRAINT "_Community_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_tags" ADD CONSTRAINT "_Community_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_userGroups" ADD CONSTRAINT "_Community_userGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_userGroups" ADD CONSTRAINT "_Community_userGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_contacts" ADD CONSTRAINT "_Community_contacts_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_contacts" ADD CONSTRAINT "_Community_contacts_B_fkey" FOREIGN KEY ("B") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_services" ADD CONSTRAINT "_Community_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Community_services" ADD CONSTRAINT "_Community_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
