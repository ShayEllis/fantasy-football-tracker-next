import {
  AllLeaguesStatsTable,
  AllLeaguesColumns,
  type League,
} from '@/components/Tables/AllLeaguesStatsTable/AllLeaguesStatsTable'
import {
  SingleLeagueStatsTable,
  singleLeagueColumns,
  type SingleLeagueWeek,
} from '../../../components/Tables/SingleLeagueStatsTable/SingleLeagueStatsTable'

async function getSingleLeagueData(): Promise<SingleLeagueWeek[]> {
  return [
    {
      week: 1,
      projectedWin: 45,
      win: true,
      projectedPoints: 121,
      points: 54,
      place: 2,
    },
    {
      week: 2,
      projectedWin: 45,
      win: true,
      projectedPoints: 121,
      points: 54,
      place: 2,
    },
    {
      week: 3,
      projectedWin: 45,
      win: true,
      projectedPoints: 121,
      points: 54,
      place: 2,
    },
  ]
}

async function getAllLeagueData(): Promise<League[]> {
  return [
    {
      leagueName: 'league 1',
      weekData: [
        {
          week: 1,
          projectedWin: 2,
          win: true,
          projectedPoints: 22,
          points: 2,
          place: 5,
        },
        {
          week: 2,
          projectedWin: 2,
          win: true,
          projectedPoints: 22,
          points: 2,
          place: 5,
        },
      ],
    },
    {
      leagueName: 'league 2',
      weekData: [
        {
          week: 1,
          projectedWin: 2,
          win: true,
          projectedPoints: 22,
          points: 2,
          place: 5,
        },
        {
          week: 2,
          projectedWin: 2,
          win: true,
          projectedPoints: 22,
          points: 2,
          place: 5,
        },
      ],
    },
  ]
}

export default async function WeeklyStats() {
  const [singleLeagueData, allLeagueData] = await Promise.all([
    getSingleLeagueData(),
    getAllLeagueData(),
  ])

  return (
    <>
      <h3>Stats</h3>
      <div className='container mx-auto py-10'>
        <SingleLeagueStatsTable
          columns={singleLeagueColumns}
          data={singleLeagueData}
        />
      </div>
      <div className='container mx-auto py-10'>
        <AllLeaguesStatsTable
          columns={AllLeaguesColumns}
          data={allLeagueData}
        />
      </div>
    </>
  )
}
