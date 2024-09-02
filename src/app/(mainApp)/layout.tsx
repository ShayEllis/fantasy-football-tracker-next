import { Nav, Navbar, NavSideDrawer, NavLink } from '@/components/Nav/Nav'
import { type ReactNode } from 'react'
import { SessionProvider } from '@/auth/SessionProvider'
import { Session } from 'inspector/promises'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Navbar>
          <NavSideDrawer>
            <Nav>
              <NavLink href=''>Test 1</NavLink>
              <NavLink href=''>Test 2</NavLink>
              <NavLink href=''>Test 3</NavLink>
            </Nav>
          </NavSideDrawer>
        </Navbar>
      </SessionProvider>
      <div className='container p-2 h-[1000px]'>{children}</div>
    </>
  )
}
