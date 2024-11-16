-- CreateTable
CREATE TABLE "UserGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "owner" TEXT,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_User_groups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Service_userGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DocumentCollection_userGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "UserGroup_owner_idx" ON "UserGroup"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "_User_groups_AB_unique" ON "_User_groups"("A", "B");

-- CreateIndex
CREATE INDEX "_User_groups_B_index" ON "_User_groups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_userGroups_AB_unique" ON "_Service_userGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_userGroups_B_index" ON "_Service_userGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DocumentCollection_userGroups_AB_unique" ON "_DocumentCollection_userGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_DocumentCollection_userGroups_B_index" ON "_DocumentCollection_userGroups"("B");

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_groups" ADD CONSTRAINT "_User_groups_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_groups" ADD CONSTRAINT "_User_groups_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_userGroups" ADD CONSTRAINT "_Service_userGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_userGroups" ADD CONSTRAINT "_Service_userGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentCollection_userGroups" ADD CONSTRAINT "_DocumentCollection_userGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "DocumentCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentCollection_userGroups" ADD CONSTRAINT "_DocumentCollection_userGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
