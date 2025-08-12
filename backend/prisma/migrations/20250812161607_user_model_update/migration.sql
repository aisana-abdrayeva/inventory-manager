-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('active', 'blocked');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'active';
