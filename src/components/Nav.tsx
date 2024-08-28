'use client'

import { type ReactNode, type ComponentProps } from 'react'
import footballLogo from '../../public/football-icon.svg'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@/components/SignOutButton'

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
          <SheetTitle className='text-2xl'>User name</SheetTitle>
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

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathName = usePathname()

  return (
    <Link
      {...props}
      className={cn(
        'w-1/2 p-4 hover:bg-secondary rounded-md hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathName === props.href && 'bg-secondary text-secondary-foreground'
      )}
    />
  )
}
