/*
  Warnings:

  - You are about to drop the column `membershipId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `memberships` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_id_fkey";

-- DropIndex
DROP INDEX "users_membershipId_key";

-- AlterTable
ALTER TABLE "memberships" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "membershipId";

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userId_key" ON "memberships"("userId");

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
