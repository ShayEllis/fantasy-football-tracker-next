import { LeagueForm } from '@/components/LeagueForm'
import { Modal } from '@/components/Modal'
import { db } from '@/db/db'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  // fetch league data here and pass down to league form

  // fetch league data here and pass down to league form

  const leagueData = await db.fantasyLeague.findUnique({ where: { id } })

  if (!leagueData) return // fix - will likely want to redirect

  return (
    <Modal title='Edit league' description='Edit an exsisting league.'>
      <LeagueForm variant='edit' data={leagueData} />
    </Modal>
  )
}
