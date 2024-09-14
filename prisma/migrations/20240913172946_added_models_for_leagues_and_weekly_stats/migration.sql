-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('SYSTEM', 'LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('ESPN', 'Free', 'Sleeper', 'Yahoo');

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "theme" "Theme" NOT NULL DEFAULT 'SYSTEM',
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FantasyLeague" (
    "leagueName" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "teamCount" INTEGER NOT NULL,
    "draftDate" TIMESTAMP(3),
    "platform" "Platform" NOT NULL,
    "buyIn" INTEGER NOT NULL,
    "pickPosition" INTEGER,
    "playoffTeams" INTEGER,
    "initialRank" INTEGER,
    "currentRank" INTEGER,
    "payout1" INTEGER,
    "payout2" INTEGER,
    "payout3" INTEGER,
    "userId" TEXT,

    CONSTRAINT "FantasyLeague_pkey" PRIMARY KEY ("leagueName")
);

-- CreateTable
CREATE TABLE "WeeklyStats" (
    "id" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "W_L_Before" TEXT,
    "projectedPoints" INTEGER,
    "actualPoints" INTEGER,
    "W_L_After" TEXT,
    "overallPlace" INTEGER,
    "fantasyLeagueLeagueName" TEXT,

    CONSTRAINT "WeeklyStats_pkey" PRIMARY KEY ("id","week")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FantasyLeague" ADD CONSTRAINT "FantasyLeague_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyStats" ADD CONSTRAINT "WeeklyStats_fantasyLeagueLeagueName_fkey" FOREIGN KEY ("fantasyLeagueLeagueName") REFERENCES "FantasyLeague"("leagueName") ON DELETE SET NULL ON UPDATE CASCADE;
