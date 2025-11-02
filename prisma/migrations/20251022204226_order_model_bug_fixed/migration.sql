/*
  Warnings:

  - You are about to drop the column `isdelivered` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isdelivered",
ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false;
