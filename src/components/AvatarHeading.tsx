'use client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useContext } from 'react'
import { SessionContext } from '@/auth/SessionProvider'
import { LoaderCircle } from 'lucide-react'

export function AvatarHeading() {
  const session = useContext(SessionContext)
  console.log('context', session)

  let avatarFallback = ''
  let username = 'User'

  if (session && session?.user?.name) {
    avatarFallback = session.user.name[0]
    username = session.user.name
  }

  return (
    <div className='w-fit flex'>
      {session === null ? (
        <>
          <LoaderCircle className='size-10 animate-spin' />
          <h2 className='inline-block my-auto ps-2'>Loading...</h2>
        </>
      ) : (
        <>
          <Avatar className='inline-block'>
            {session?.user?.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <h2 className='inline-block my-auto ps-2'>{username}</h2>
        </>
      )}
    </div>
  )
}
