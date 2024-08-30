'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

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
