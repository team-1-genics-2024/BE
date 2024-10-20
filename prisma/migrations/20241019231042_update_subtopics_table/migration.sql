/*
  Warnings:

  - You are about to drop the column `imageUri` on the `classes` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `subtopics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `subtopics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `subtopics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "imageUri",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subtopics" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;
