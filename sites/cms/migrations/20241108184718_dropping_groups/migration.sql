/*
  Warnings:

  - You are about to drop the `UserGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGroupRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserGroupRole" DROP CONSTRAINT "UserGroupRole_group_fkey";

-- DropForeignKey
ALTER TABLE "UserGroupRole" DROP CONSTRAINT "UserGroupRole_user_fkey";

-- DropTable
DROP TABLE "UserGroup";

-- DropTable
DROP TABLE "UserGroupRole";

-- DropEnum
DROP TYPE "UserGroupRoleRoleType";
