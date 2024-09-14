import { LeagueForm } from '@/components/LeagueForm'
import { LeagueInfoCard } from '@/components/LeagueInfoCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Teams() {
  return (
    <>
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
