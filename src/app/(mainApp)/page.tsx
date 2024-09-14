import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className=''>
      <Button asChild>
        <Link href='/teams'>Teams</Link>
      </Button>
      <Button asChild>
        <Link href='/stats'>Stats</Link>
      </Button>
    </main>
  )
}
