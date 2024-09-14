import { ColumnDef } from '@tanstack/react-table'

export type SingleLeagueWeek = {
  week: number
  projectedWin: number
  win: boolean
  projectedPoints: number
  points: number
  place: number
}

export const singleLeagueColumns: ColumnDef<SingleLeagueWeek>[] = [
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
