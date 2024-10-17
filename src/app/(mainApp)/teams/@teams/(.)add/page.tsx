import { LeagueForm } from '@/components/LeagueForm'
import { Modal } from '@/components/Modal'

export default function Page() {
  return (
    <Modal title='Add league' description='Add a new league.'>
      <LeagueForm />
    </Modal>
  )
}