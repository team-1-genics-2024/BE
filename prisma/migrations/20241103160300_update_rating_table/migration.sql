/*
  Warnings:

  - The primary key for the `ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ratings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ratings_id_seq";
