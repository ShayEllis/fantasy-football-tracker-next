/*
  Warnings:

  - The primary key for the `FantasyLeague` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fantasyLeagueLeagueName` on the `WeeklyStats` table. All the data in the column will be lost.
  - The required column `id` was added to the `FantasyLeague` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "FantasyLeague" DROP CONSTRAINT "FantasyLeague_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyStats" DROP CONSTRAINT "WeeklyStats_fantasyLeagueLeagueName_fkey";

-- AlterTable
ALTER TABLE "FantasyLeague" DROP CONSTRAINT "FantasyLeague_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "FantasyLeague_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WeeklyStats" DROP COLUMN "fantasyLeagueLeagueName",
ADD COLUMN     "fantasyLeagueId" TEXT;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLeague" ADD CONSTRAINT "FantasyLeague_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyStats" ADD CONSTRAINT "WeeklyStats_fantasyLeagueId_fkey" FOREIGN KEY ("fantasyLeagueId") REFERENCES "FantasyLeague"("id") ON DELETE CASCADE ON UPDATE CASCADE;
