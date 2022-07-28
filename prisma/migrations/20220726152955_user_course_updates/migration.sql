/*
  Warnings:

  - The primary key for the `user_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_course_address` on the `user_address` table. All the data in the column will be lost.
  - The required column `user_address_id` was added to the `user_address` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_pkey",
DROP COLUMN "user_course_address",
ADD COLUMN     "user_address_id" TEXT NOT NULL,
ADD CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_address_id");
