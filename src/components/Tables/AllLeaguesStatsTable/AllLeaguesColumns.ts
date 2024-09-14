import { ColumnDef } from '@tanstack/react-table'
import { type SingleLeagueWeek } from '../SingleLeagueStatsTable/SingleLeagueColumns'

export type League = {
  leagueName: string
  weekData: SingleLeagueWeek[]
}

// Example data
const leagues = [
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

export const AllLeaguesColumns: ColumnDef<League>[] = [
  {
    accessorKey: 'week',
    header: 'Week',
  },
  {
    accessorKey: 'projectedWin',
    header: 'Proj. Win',
  },
  {
    accessorKey: 'win',
    header: 'Win',
  },
  {
    accessorKey: 'projectedPoints',
    header: 'Proj. Points',
  },
  {
    accessorKey: 'points',
    header: 'Points',
  },

  {
    accessorKey: 'place',
    header: 'Place',
  },
]
