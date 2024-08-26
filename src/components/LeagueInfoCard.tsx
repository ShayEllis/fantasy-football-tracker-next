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

export function LeagueInfoCard() {
  return (
    <Card className='w-[250px]'>
      <Tabs defaultValue='tab1'>
        <CardHeader>
          <div className='flex align-middle justify-between'>
            <CardTitle className='my-auto text-xl'>League Name</CardTitle>
            <Button variant='outline' className='p-1 h-auto'>
              <SquarePen className='size-5' />
            </Button>
          </div>
          <CardDescription className='text-base pb-1'>
            Team Name
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
                    {`${'Test'} - Team`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Draft Date:</TableCell>
                  <TableCell>{'08/07/2024'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Platform:</TableCell>
                  <TableCell>{'Free'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Buy-In:</TableCell>
                  <TableCell>{'$20.00'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pick Position:</TableCell>
                  <TableCell>{'7'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Playoff Teams:</TableCell>
                  <TableCell>{'1'}</TableCell>
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
                  <TableCell>Initial Rank:</TableCell>
                  <TableCell>{'2'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CurrentRank:</TableCell>
                  <TableCell>{'11'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payout 1:</TableCell>
                  <TableCell>{'$100.00'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payout 2:</TableCell>
                  <TableCell>{'$20.00'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payout 3:</TableCell>
                  <TableCell>{'$5.00'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
