/*
  Warnings:

  - You are about to alter the column `price` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "plans" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "time" DROP DEFAULT,
ALTER COLUMN "time" SET DATA TYPE TEXT;
