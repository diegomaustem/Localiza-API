/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `states` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `abbreviation` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "states" ADD COLUMN     "abbreviation" VARCHAR(45) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "states_abbreviation_key" ON "states"("abbreviation");
