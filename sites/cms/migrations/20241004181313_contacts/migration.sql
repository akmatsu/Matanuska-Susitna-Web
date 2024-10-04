-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "phone" TEXT,
    "email" TEXT,
    "user" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Contact_services" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_user_key" ON "Contact"("user");

-- CreateIndex
CREATE UNIQUE INDEX "_Contact_services_AB_unique" ON "_Contact_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Contact_services_B_index" ON "_Contact_services"("B");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact_services" ADD CONSTRAINT "_Contact_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Contact_services" ADD CONSTRAINT "_Contact_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
