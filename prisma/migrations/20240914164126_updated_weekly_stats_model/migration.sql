/*
  Warnings:

  - You are about to drop the column `W_L_After` on the `WeeklyStats` table. All the data in the column will be lost.
  - You are about to drop the column `W_L_Before` on the `WeeklyStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeeklyStats" DROP COLUMN "W_L_After",
DROP COLUMN "W_L_Before",
ADD COLUMN     "gameWin" BOOLEAN,
ADD COLUMN     "winPercentage" INTEGER;
