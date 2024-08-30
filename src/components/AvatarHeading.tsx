import { auth } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export async function AvatarHeading() {
  const session = await auth()
  let avatarFallback = ''
  let username = 'User'

  if (session && session?.user?.name) {
    avatarFallback = session.user.name[0]
    username = session.user.name
  }

  console.log(session)

  return (
    <div className='w-fit flex'>
      <Avatar className='inline-block'>
        {session?.user?.image && <AvatarImage src={session.user.image} />}
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <h2 className='inline-block my-auto ps-2'>{username}</h2>
    </div>
  )
}
