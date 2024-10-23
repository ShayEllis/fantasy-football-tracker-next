import { getSession } from '@/auth/actions/getSession'
import { LeagueInfoCard } from '@/components/LeagueInfoCard'
import { Button } from '@/components/ui/button'
import { db } from '@/db/db'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Teams() {
  const session = await getSession()

  const result = await db.fantasyLeague.findMany({
    where: { userId: session?.user?.id },
  })

  return (
    <>
      {result.map((league) => (
        <LeagueInfoCard key={league.leagueName} leagueInfo={league} />
      ))}
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
