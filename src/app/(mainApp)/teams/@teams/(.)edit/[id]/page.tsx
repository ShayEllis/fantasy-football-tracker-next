import { LeagueForm } from '@/components/LeagueForm'
import { Modal } from '@/components/Modal'

export default function Page({ params }: { params: { id: number } }) {
  return (
    <Modal title='Edit league' description='Edit an exsisting league.'>
      <LeagueForm variant='edit' />
    </Modal>
  )
}
