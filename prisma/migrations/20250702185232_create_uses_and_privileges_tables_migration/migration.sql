/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `privileges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "privileges_name_key" ON "privileges"("name");
