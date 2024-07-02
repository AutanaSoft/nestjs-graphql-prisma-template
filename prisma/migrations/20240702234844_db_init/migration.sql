-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('REGISTERED', 'ACTIVE', 'INACTIVE', 'LOCKED', 'FROZEN', 'BANNED', 'DELETED');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('GUEST', 'CUSTOMER', 'INTERNAL', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "UserStatus" NOT NULL DEFAULT 'REGISTERED',
    "roles" "UserRoles"[] DEFAULT ARRAY['CUSTOMER']::"UserRoles"[],
    "email" VARCHAR(60) NOT NULL,
    "user_name" VARCHAR(20),
    "password" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
