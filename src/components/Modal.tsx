'use client'

import { Sheet, SheetContent, SheetDescription, SheetTitle } from './ui/sheet'
import { useRouter } from 'next/navigation'
import { ReactNode, useRef } from 'react'

export function Modal({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handlePointerDownOutside = (e: CustomEvent) => {
    e.preventDefault()
    console.log(e)

    if (modalRef.current) {
      modalRef.current.classList.add('scale-105')
      setTimeout(
        () =>
          modalRef.current && modalRef.current.classList.remove('scale-105'),
        200
      )
    }
  }

  const handleOpenChange = () => {
    router.back()
  }

  return (
    <Sheet open={true} onOpenChange={handleOpenChange}>
      <SheetTitle>{title}</SheetTitle>
      <SheetDescription className='sr-only'>{description}</SheetDescription>
      <SheetContent
        ref={modalRef}
        onPointerDownOutside={handlePointerDownOutside}
        side='none'
        className='rounded-lg max-h-[95%] overflow-y-scroll'>
        {children}
      </SheetContent>
    </Sheet>
  )
}
