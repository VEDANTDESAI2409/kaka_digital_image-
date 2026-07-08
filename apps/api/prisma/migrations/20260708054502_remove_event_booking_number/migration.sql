/*
  Warnings:

  - You are about to drop the column `bookingNumber` on the `Event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Event_bookingNumber_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "bookingNumber";
