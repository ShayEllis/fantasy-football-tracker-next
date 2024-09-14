import { LeagueForm } from '@/components/LeagueForm'

export default function Page({ params }: { params: { id: number } }) {
  return <LeagueForm variant='edit' />
}
