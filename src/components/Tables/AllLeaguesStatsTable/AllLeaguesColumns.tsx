import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { type SingleLeagueWeek } from '../SingleLeagueStatsTable/SingleLeagueColumns'

export type League = {
  leagueName: string
  week: number
  projectedWin: number
  win: boolean
  projectedPoints: number
  points: number
  place: number
}

// Example data
export const allLeaguesTestData = [
  {
    leagueName: 'league 1',
    week: 1,
    projectedWin: 2,
    win: true,
    projectedPoints: 22,
    points: 2,
    place: 5,
  },
  {
    leagueName: 'league 1',
    week: 2,
    projectedWin: 2,
    win: true,
    projectedPoints: 22,
    points: 2,
    place: 5,
  },

  {
    leagueName: 'league 2',
    week: 1,
    projectedWin: 2,
    win: true,
    projectedPoints: 22,
    points: 2,
    place: 5,
  },
  {
    leagueName: 'league 2',
    week: 2,
    projectedWin: 2,
    win: true,
    projectedPoints: 22,
    points: 2,
    place: 5,
  },

  {
    leagueName: 'league 3',
  },
]

const columnHelper = createColumnHelper<League>()

export const allLeaguesColumns = [
  columnHelper.accessor('leagueName', {
    header: () => <span>League</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('week', {
    header: () => <span>Week</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('projectedWin', {
    header: () => <span>Proj. Win</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('win', {
    header: () => <span>Win</span>,
    cell: (info) => (
      <div className='text-center'>{info.getValue()?.toString()}</div>
    ),
  }),
  columnHelper.accessor('projectedPoints', {
    header: () => <span>Proj. Points</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('points', {
    header: () => <span>Points</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('place', {
    header: () => <span>Place</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
]
