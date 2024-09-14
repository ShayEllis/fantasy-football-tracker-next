import { ReactNode } from 'react'

export default function Layout({
  children,
  teams,
}: {
  children: ReactNode
  teams: ReactNode
}) {

  return (
    <main>
      <h3>teams</h3>
      {teams}
      {children}
    </main>
  )
}
