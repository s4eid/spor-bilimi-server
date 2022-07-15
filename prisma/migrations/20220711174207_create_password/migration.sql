/*
  Warnings:

  - Added the required column `password` to the `trainers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainers" ADD COLUMN     "password" TEXT NOT NULL;
