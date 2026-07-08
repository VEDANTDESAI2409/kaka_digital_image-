/*
  Warnings:

  - You are about to drop the column `checksum` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `exif` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `faceIndexed` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `isEdited` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `previewKey` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `processingStatus` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `storageKey` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `takenAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailKey` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Media` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Made the column `uploadedById` on table `Media` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_uploadedById_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "checksum",
DROP COLUMN "deletedAt",
DROP COLUMN "duration",
DROP COLUMN "exif",
DROP COLUMN "faceIndexed",
DROP COLUMN "fileSize",
DROP COLUMN "height",
DROP COLUMN "isEdited",
DROP COLUMN "previewKey",
DROP COLUMN "processingStatus",
DROP COLUMN "storageKey",
DROP COLUMN "takenAt",
DROP COLUMN "thumbnailKey",
DROP COLUMN "width",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "uploadedById" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Media_uploadedById_idx" ON "Media"("uploadedById");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
