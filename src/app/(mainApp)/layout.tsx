import { Nav, Navbar, NavSideDrawer, NavLink } from '@/components/Nav/Nav'
import { type ReactNode } from 'react'
import { SessionProvider } from '@/auth/SessionProvider'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Layout({ children }: { children: ReactNode }) {
  if (!cookies().get('authjs.session-token')?.value) {
    console.log('layout redirect')
    redirect('/signin')
  }

  return (
    <>
      <SessionProvider>
        <Navbar>
          <NavSideDrawer>
            <Nav>
              <NavLink href='/'>Home</NavLink>
              <NavLink href='/teams'>Teams</NavLink>
              <NavLink href='/weeklystats'>Weekly Stats</NavLink>
            </Nav>
          </NavSideDrawer>
        </Navbar>
      </SessionProvider>
      <div className='container p-2 h-[1000px]'>{children}</div>
    </>
  )
}
