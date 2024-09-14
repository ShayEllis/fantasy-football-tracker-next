/*
  Warnings:

  - You are about to drop the column `actualPoints` on the `WeeklyStats` table. All the data in the column will be lost.
  - You are about to drop the column `gameWin` on the `WeeklyStats` table. All the data in the column will be lost.
  - You are about to drop the column `overallPlace` on the `WeeklyStats` table. All the data in the column will be lost.
  - You are about to drop the column `pointsProjection` on the `WeeklyStats` table. All the data in the column will be lost.
  - You are about to drop the column `winProjection` on the `WeeklyStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeeklyStats" DROP COLUMN "actualPoints",
DROP COLUMN "gameWin",
DROP COLUMN "overallPlace",
DROP COLUMN "pointsProjection",
DROP COLUMN "winProjection",
ADD COLUMN     "place" INTEGER,
ADD COLUMN     "points" INTEGER,
ADD COLUMN     "projectedPoints" INTEGER,
ADD COLUMN     "projectedWin" INTEGER,
ADD COLUMN     "win" BOOLEAN;
