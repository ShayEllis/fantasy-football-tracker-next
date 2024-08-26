import { signOut } from "@/auth/auth";
import { Button } from "./ui/button";

export function SignOutButton () {
  return (
    <form action={async () => {
      'use server'
      await signOut()
    }}>
      <Button>Sign Out</Button>
    </form>
  )
}