-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sceneId" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'N/A',
    "attachments" JSONB NOT NULL,
    "attributes" JSONB NOT NULL,
    "roles" JSONB NOT NULL,
    "deadline" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNASSIGNED',
    "assignee" TEXT NOT NULL DEFAULT 'N/A',
    "work" TEXT NOT NULL DEFAULT 'N/A'
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_key" ON "Job"("id");
