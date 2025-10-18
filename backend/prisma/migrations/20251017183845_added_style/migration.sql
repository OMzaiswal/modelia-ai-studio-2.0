/*
  Warnings:

  - Added the required column `style` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GenerationStyle" AS ENUM ('Editorial', 'Streetwear', 'Vintage');

-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "style" "GenerationStyle" NOT NULL;
