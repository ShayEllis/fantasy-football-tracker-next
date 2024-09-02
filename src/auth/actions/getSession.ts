'use server'

import { auth } from '../auth'

export const getSession = async () => {
  const session = await auth()

  if (
    !session ||
    (session?.expires && Date.parse(session?.expires) <= Date.now())
  ) {
    return null
  }

  return session
}
