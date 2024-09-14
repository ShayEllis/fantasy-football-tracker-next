/*
  Warnings:

  - You are about to drop the column `projectedPoints` on the `WeeklyStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeeklyStats" DROP COLUMN "projectedPoints",
ADD COLUMN     "pointsProjection" INTEGER;
