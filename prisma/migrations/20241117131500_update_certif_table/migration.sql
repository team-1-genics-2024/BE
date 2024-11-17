/*
  Warnings:

  - The primary key for the `certificates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `score` on the `certificates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_pkey",
DROP COLUMN "score",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "certificates_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "certificates_id_seq";
