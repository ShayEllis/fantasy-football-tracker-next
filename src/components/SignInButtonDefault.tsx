import { signIn } from '@/auth/auth'
import { Button } from './ui/button'

export function SignInButtonDefault() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}>
      <Button>Default Sign In</Button>
    </form>
  )
}
