'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

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
