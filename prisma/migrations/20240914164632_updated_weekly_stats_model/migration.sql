/*
  Warnings:

  - You are about to drop the column `winPercentage` on the `WeeklyStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeeklyStats" DROP COLUMN "winPercentage",
ADD COLUMN     "winProjection" INTEGER;
