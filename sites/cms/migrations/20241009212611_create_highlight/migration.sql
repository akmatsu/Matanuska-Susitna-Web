-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "publishAt" TIMESTAMP(3),
    "unpublishAt" TIMESTAMP(3),
    "link" TEXT,
    "image" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);
