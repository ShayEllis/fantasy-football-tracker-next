import { auth } from "@/auth/auth"
import { SignInForm } from "@/components/SignInForm"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth()

  if (session) redirect('/')

  console.log(session)

  return (
    <div className='flex flex-col justify-center h-screen'>
      <SignInForm />
    </div>
  )
}
