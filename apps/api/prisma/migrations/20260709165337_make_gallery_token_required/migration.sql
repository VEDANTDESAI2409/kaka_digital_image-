/*
  Warnings:

  - Made the column `galleryToken` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "galleryToken" SET NOT NULL;
