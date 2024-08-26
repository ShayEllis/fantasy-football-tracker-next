'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { signIn } from '@/auth/auth'

export function SignInButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.push('/signin')
      }}>
      Sign In
    </Button>
  )
}
