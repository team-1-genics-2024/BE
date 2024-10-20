-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_membershipId_fkey";

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("membershipId") ON DELETE RESTRICT ON UPDATE CASCADE;
