/*
  Warnings:

  - A unique constraint covering the columns `[classId]` on the table `quizzes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classId` to the `quizzes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "classId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "results" ADD COLUMN     "classId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_classId_key" ON "quizzes"("classId");

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
