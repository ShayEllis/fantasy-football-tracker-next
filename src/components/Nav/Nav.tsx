import { type ReactNode } from 'react'
import footballLogo from '../../../public/football-icon.svg'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Menu } from 'lucide-react'
import { SignOutButton } from '@/components/SignOutButton'
import { AvatarHeading } from '../AvatarHeading'

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <header className='transition-colors text-nav-foreground border-b flex justify-between px-3 sticky top-0 z-40 backdrop-blur-[10px] bg-[radial-gradient(hsl(var(--background)/.4)_20%,transparent_20%,transparent_50%,hsl(var(--background)/.4)_40%)] bg-[size:35px_12px]'>
      <div className='flex'>
        <Image
          src={footballLogo}
          alt='Football logo'
          className='rotate-45 inline-block size-8 m-auto'
        />
        <h2 className='inline-block ps-3 text-lg font-bold m-auto'>
          Fantasy Football Tracker
        </h2>
      </div>
      {children}
    </header>
  )
}

export function NavSideDrawer({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger className='rounded-md border border-muted-foreground bg-background hover:bg-accent hover:text-accent-foreground p-2 my-2'>
        <Menu />
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle className='text-2xl'>
            <AvatarHeading />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className='sr-only'>Navigation Menu</SheetDescription>
        {children}
        <SheetFooter className='sm:justify-start'>
          <SignOutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export function Nav({ children }: { children: ReactNode }) {
  return <nav className='h-full flex flex-col gap-2'>{children}</nav>
}

export { NavLink } from './NavLink'