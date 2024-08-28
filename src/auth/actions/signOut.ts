'use server'

import { signOut } from '@/auth/auth'

const asyncSignOut = async () => {
  await signOut()
}

export { asyncSignOut }
