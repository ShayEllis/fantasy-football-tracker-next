'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { getSession } from './actions/getSession'
import type { Session } from 'next-auth'

export const SessionContext = createContext<null | Session>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | Session>(null)

  useEffect(() => {
    (async () => {
      setSession(await getSession())
    })()
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
