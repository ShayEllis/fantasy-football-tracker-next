import { ToggleDarkMode } from '@/components/ToggleDarkMode'
import { LeagueInfoCard } from '@/components/LeagueInfoCard'
import { TestElement } from '@/components/TestElement'
import { EditLeague } from '@/components/EditLeague'
import { SignInButton } from '@/components/SignInButton'
import { SignInButtonDefault } from '@/components/SignInButtonDefault'
import { SignOutButton } from '@/components/SignOutButton'
import { UserAvatar } from '@/components/UserAvatar'

export default function Home() {
  return (
    <main className=''>
      <div className=''>
        <h1>Home Page</h1>
      </div>
      <ToggleDarkMode />
      <LeagueInfoCard />
      <TestElement />
      <EditLeague />
      <SignInButton />
      <SignInButtonDefault />
      <SignOutButton />
      <UserAvatar />
    </main>
  )
}
