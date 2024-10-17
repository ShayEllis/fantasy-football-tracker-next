import { createColumnHelper } from '@tanstack/react-table'

export type League = {
  leagueName: string
  week?: number
  projectedWin?: number
  win?: boolean
  projectedPoints?: number
  points?: number
  place?: number
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
    win: false,
    projectedPoints: 22,
    points: 2,
    place: 5,
  },
  {
    leagueName: 'league 2',
  },
  {
    leagueName: 'league 3',
  },
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
    win: false,
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
    place: 55,
  },
  {
    leagueName: 'league 3',
  },
  {
    leagueName: 'league 1',
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
    win: false,
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
    place: 55,
  },
  {
    leagueName: 'league 3',
  },
]

const columnHelper = createColumnHelper<League>()

export const allLeaguesColumns = [
  columnHelper.accessor('leagueName', {
    header: () => <span>League</span>,
  }),
  columnHelper.accessor('week', {
    header: () => <span>Week</span>,
  }),
  columnHelper.accessor('projectedWin', {
    header: () => <span>Proj. Win</span>,
  }),
  columnHelper.accessor('win', {
    header: () => <span>Win</span>,
  }),
  columnHelper.accessor('projectedPoints', {
    header: () => <span>Proj. Points</span>,
  }),
  columnHelper.accessor('points', {
    header: () => <span>Points</span>,
  }),
  columnHelper.accessor('place', {
    header: () => <span>Place</span>,
  }),
]
