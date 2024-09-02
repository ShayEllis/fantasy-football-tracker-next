'use server'

import { signOut } from '@/auth/auth'

export const asyncSignOut = async () => {
  await signOut()
}
