import { auth } from '@/auth/auth'

export async function UserAvatar() {
  const session = await auth()
  console.log(session)

  if (!session?.user) console.log('no user found')
  return (
    <div>
      <h3>Session Info</h3>
    </div>
  )
}
