'use client'

import { asyncSignOut } from '../auth/actions/signOut'
import { Button } from './ui/button'

export function SignOutButton() {
  return (
    <form
      action={async () => {
        await asyncSignOut()
      }}>
      <Button>Sign Out</Button>
    </form>
  )
}
