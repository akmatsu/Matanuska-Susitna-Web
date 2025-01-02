-- CreateTable
CREATE TABLE "AssemblyDistrict" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "owner" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "email" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "termStart" TIMESTAMP(3),
    "termEnd" TIMESTAMP(3),

    CONSTRAINT "AssemblyDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssemblyDistrict_slug_key" ON "AssemblyDistrict"("slug");

-- CreateIndex
CREATE INDEX "AssemblyDistrict_title_idx" ON "AssemblyDistrict"("title");

-- CreateIndex
CREATE INDEX "AssemblyDistrict_description_idx" ON "AssemblyDistrict"("description");

-- CreateIndex
CREATE INDEX "AssemblyDistrict_owner_idx" ON "AssemblyDistrict"("owner");

-- AddForeignKey
ALTER TABLE "AssemblyDistrict" ADD CONSTRAINT "AssemblyDistrict_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
