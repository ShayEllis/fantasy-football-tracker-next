import { LeagueInfoCard } from '@/components/LeagueInfoCard'
import { Button } from '@/components/ui/button'
import { db } from '@/db/db'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Teams() {
  const result = await db.fantasyLeague.findMany()
  console.log('Teams rendered', result)

  return (
    <>
      {result.map((league) => (
        <LeagueInfoCard key={league.leagueName} />
      ))}
      <LeagueInfoCard />
      <Button
        className='rounded-full h-auto p-4 fixed bottom-6 right-6'
        asChild>
        <Link href={'/teams/add'}>
          <Plus className='size-6' />
        </Link>
      </Button>
    </>
  )
}
