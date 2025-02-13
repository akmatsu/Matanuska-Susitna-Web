/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "OrgUnit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "owner" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrgUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Contact_orgUnits" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrgUnit_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrgUnit_services" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgUnit_slug_key" ON "OrgUnit"("slug");

-- CreateIndex
CREATE INDEX "OrgUnit_title_idx" ON "OrgUnit"("title");

-- CreateIndex
CREATE INDEX "OrgUnit_owner_idx" ON "OrgUnit"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "_Contact_orgUnits_AB_unique" ON "_Contact_orgUnits"("A", "B");

-- CreateIndex
CREATE INDEX "_Contact_orgUnits_B_index" ON "_Contact_orgUnits"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrgUnit_tags_AB_unique" ON "_OrgUnit_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_OrgUnit_tags_B_index" ON "_OrgUnit_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrgUnit_services_AB_unique" ON "_OrgUnit_services"("A", "B");

-- CreateIndex
CREATE INDEX "_OrgUnit_services_B_index" ON "_OrgUnit_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_token_key" ON "ApiKey"("token");

-- AddForeignKey
ALTER TABLE "OrgUnit" ADD CONSTRAINT "OrgUnit_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact_orgUnits" ADD CONSTRAINT "_Contact_orgUnits_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact_orgUnits" ADD CONSTRAINT "_Contact_orgUnits_B_fkey" FOREIGN KEY ("B") REFERENCES "OrgUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgUnit_tags" ADD CONSTRAINT "_OrgUnit_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "OrgUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgUnit_tags" ADD CONSTRAINT "_OrgUnit_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgUnit_services" ADD CONSTRAINT "_OrgUnit_services_A_fkey" FOREIGN KEY ("A") REFERENCES "OrgUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgUnit_services" ADD CONSTRAINT "_OrgUnit_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
