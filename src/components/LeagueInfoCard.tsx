'use client'

import { TabsContent } from '@radix-ui/react-tabs'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { SquarePen } from 'lucide-react'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableRow } from './ui/table'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { type FantasyLeague } from '@prisma/client'
import { format } from 'date-fns'
import { formatCurrencyFromCents } from '@/lib/formatters'

export function LeagueInfoCard({ leagueInfo }: { leagueInfo: FantasyLeague }) {
  const router = useRouter()

  return (
    <Card className='w-[250px]'>
      <Tabs defaultValue='tab1'>
        <CardHeader>
          <div className='flex align-middle justify-between'>
            <CardTitle className='my-auto text-xl truncate'>
              {leagueInfo.leagueName}
            </CardTitle>
            <Button variant='outline' className='p-1 h-auto' asChild>
              <Link href={`teams/edit/${leagueInfo.id}`}>
                <SquarePen className='size-5' />
              </Link>
            </Button>
          </div>
          <CardDescription className='text-base pb-1'>
            {leagueInfo.teamName}
          </CardDescription>
        </CardHeader>
        <TabsList className='w-full flex mb-1'>
          <TabsTrigger value='tab1' className='flex-grow'>
            Summary
          </TabsTrigger>
          <TabsTrigger value='tab2' className='flex-grow'>
            Details
          </TabsTrigger>
        </TabsList>
        <TabsContent value='tab1'>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} className='text-center'>
                    {`${leagueInfo.teamCount} - Team`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='w-1/2'>Draft Date:</TableCell>
                  <TableCell>
                    {leagueInfo.draftDate && format(leagueInfo.draftDate, 'P')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Platform:</TableCell>
                  <TableCell>{leagueInfo.platform}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Buy-In:</TableCell>
                  <TableCell>
                    {leagueInfo.buyIn &&
                      formatCurrencyFromCents(leagueInfo.buyIn)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pick Position:</TableCell>
                  <TableCell>{leagueInfo.pickPosition}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Playoff Teams:</TableCell>
                  <TableCell>{leagueInfo.playoffTeams}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </TabsContent>
        <TabsContent value='tab2'>
          <CardContent>
            <Table className='h-[173px]'>
              <TableBody>
                <TableRow>
                  <TableCell className='w-1/2'>Initial Rank:</TableCell>
                  <TableCell>{leagueInfo.initialRank}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CurrentRank:</TableCell>
                  <TableCell>{leagueInfo.currentRank}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payout 1:</TableCell>
                  <TableCell>
                    {leagueInfo.payout1 &&
                      formatCurrencyFromCents(leagueInfo.payout1)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payout 2:</TableCell>
                  <TableCell>
                    {leagueInfo.payout2 &&
                      formatCurrencyFromCents(leagueInfo.payout2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payout 3:</TableCell>
                  <TableCell>
                    {leagueInfo.payout3 &&
                      formatCurrencyFromCents(leagueInfo.payout3)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
