-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('admin', 'content_manager', 'contributor', 'collaborator');

-- CreateEnum
CREATE TYPE "UserGroupRoleRoleType" AS ENUM ('owner', 'contributor', 'collaborator', 'reader');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleType";

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroupRole" (
    "id" TEXT NOT NULL,
    "group" TEXT,
    "user" TEXT,
    "role" "UserGroupRoleRoleType",

    CONSTRAINT "UserGroupRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserGroupRole_group_idx" ON "UserGroupRole"("group");

-- CreateIndex
CREATE INDEX "UserGroupRole_user_idx" ON "UserGroupRole"("user");

-- CreateIndex
CREATE INDEX "Document_title_idx" ON "Document"("title");

-- CreateIndex
CREATE INDEX "Service_title_idx" ON "Service"("title");

-- CreateIndex
CREATE INDEX "Service_description_idx" ON "Service"("description");

-- AddForeignKey
ALTER TABLE "UserGroupRole" ADD CONSTRAINT "UserGroupRole_group_fkey" FOREIGN KEY ("group") REFERENCES "UserGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupRole" ADD CONSTRAINT "UserGroupRole_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
