-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'pending';
