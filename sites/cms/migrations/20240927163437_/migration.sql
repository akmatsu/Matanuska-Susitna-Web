/*
  Warnings:

  - You are about to drop the `_Service_externalLinks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Service_externalLinks" DROP CONSTRAINT "_Service_externalLinks_A_fkey";

-- DropForeignKey
ALTER TABLE "_Service_externalLinks" DROP CONSTRAINT "_Service_externalLinks_B_fkey";

-- DropTable
DROP TABLE "_Service_externalLinks";
