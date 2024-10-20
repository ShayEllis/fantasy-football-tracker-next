import { Nav, Navbar, NavSideDrawer, NavLink } from '@/components/Nav/Nav'
import { useContext, type ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { ToggleDarkMode } from '@/components/ToggleDarkMode'
import { SessionContext } from '@/auth/SessionProvider'

export default function Layout({ children }: { children: ReactNode }) {
  if (!cookies().get('authjs.session-token')?.value) {
    redirect('/signin')
  }

  return (
    <>
      <Navbar>
        <NavSideDrawer>
          <div className='h-full'>
            <Nav>
              <NavLink href='/'>Home</NavLink>
              <NavLink href='/teams'>Teams</NavLink>
              <NavLink href='/stats'>Stats</NavLink>
            </Nav>
            <Separator className='my-4' />
            <ToggleDarkMode />
          </div>
        </NavSideDrawer>
      </Navbar>
      <div className='container p-2 h-[1000px]'>{children}</div>
    </>
  )
}
