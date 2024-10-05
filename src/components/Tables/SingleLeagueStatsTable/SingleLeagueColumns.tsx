import { createColumnHelper } from '@tanstack/react-table'

// Example Data
export const singleLeagueTestData = [
  {
    week: 1,
    projectedWin: 41,
    win: true,
    projectedPoints: 121,
    points: 54,
    place: 2,
  },
  {
    week: 22,
    projectedWin: 42,
    win: true,
    projectedPoints: 1,
    points: 4,
    place: 2,
  },
  {
    week: 3,
    projectedWin: 43,
    win: true,
    projectedPoints: 21,
    points: 5,
    place: 23,
  },
]

export type SingleLeagueWeek = {
  week: number
  projectedWin: number
  win: boolean
  projectedPoints: number
  points: number
  place: number
}

const columnHelper = createColumnHelper<SingleLeagueWeek>()

export const singleLeagueColumns = [
  columnHelper.accessor('week', {
    // header: ({ column }) => (
    //   <div className='text-center'>
    //     <Button
    //       variant='ghost'
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    //       Week
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </Button>
    //   </div>
    // ),
    header: () => <span>Week</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
    sortDescFirst: false,
    // String column will sort ascending by default
    // sortUndefined: 'last', // force undefined values to the end
    // sortDescFirst: false, // first sort order will be ascending (nullable values can mess up auto detection of sort order)
    // Number columns will sort decending by default
    // sortingFn: sortStatusFn, // Can set custom sorting function
    // enableSorting: false, // Can disable sorting for a column
    // invertSorting: true, // invert the sorting order
  }),
  columnHelper.accessor('projectedWin', {
    header: () => <span>Proj. Win</span>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
  }),
  columnHelper.accessor('win', {
    header: () => <span>Win</span>,
    cell: (info) => (
      <div className='text-center'>{info.getValue().toString()}</div>
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
