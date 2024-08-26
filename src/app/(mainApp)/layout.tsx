import { Nav, Navbar, NavLink } from '@/components/Nav'
import { type ReactNode } from 'react'
import { NavSideDrawer } from '@/components/Nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar>
        <NavSideDrawer>
          <Nav>
            <NavLink href=''>Test 1</NavLink>
            <NavLink href=''>Test 2</NavLink>
            <NavLink href=''>Test 3</NavLink>
          </Nav>
        </NavSideDrawer>
      </Navbar>
      <div className='container p-2 h-[1000px]'>{children}</div>
    </>
  )
}
