/*
  Warnings:

  - A unique constraint covering the columns `[bookingNumber]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "Booking"("bookingNumber");

-- CreateIndex
CREATE INDEX "Booking_bookingNumber_idx" ON "Booking"("bookingNumber");
