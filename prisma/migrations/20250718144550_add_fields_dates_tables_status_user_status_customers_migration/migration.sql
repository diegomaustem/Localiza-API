/*
  Warnings:

  - Added the required column `update_date` to the `status_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_date` to the `status_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "status_customers" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "status_users" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_date" TIMESTAMP(3) NOT NULL;
