import {
  AllLeaguesStatsTable,
  allLeaguesColumns,
  type League,
} from '@/components/Tables/AllLeaguesStatsTable/AllLeaguesStatsTable'
import {
  SingleLeagueStatsTable,
  singleLeagueColumns,
  type SingleLeagueWeek,
} from '../../../components/Tables/SingleLeagueStatsTable/SingleLeagueStatsTable'
import { allLeaguesTestData } from '@/components/Tables/AllLeaguesStatsTable/AllLeaguesColumns'
import { singleLeagueTestData } from '@/components/Tables/SingleLeagueStatsTable/SingleLeagueColumns'

async function getSingleLeagueData(): Promise<SingleLeagueWeek[]> {
  return singleLeagueTestData
}

async function getAllLeagueData(): Promise<League[]> {
  return allLeaguesTestData
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
          columns={allLeaguesColumns}
          data={allLeagueData}
        />
      </div>
    </>
  )
}
