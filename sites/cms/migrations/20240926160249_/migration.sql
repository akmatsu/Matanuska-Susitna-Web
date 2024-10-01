-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "service" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "process" TEXT,
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Process_service_idx" ON "Process"("service");

-- CreateIndex
CREATE INDEX "Step_process_idx" ON "Step"("process");

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_process_fkey" FOREIGN KEY ("process") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;
