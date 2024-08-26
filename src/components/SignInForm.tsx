import { providerInfoMap, signIn } from '@/auth/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'
import githubIcon from '../../public/github-mark.svg'
import googleIcon from '../../public/google-icon.svg'

export function SignInForm() {
  return (
    <div className='bg-secondary mx-auto rounded-lg flex flex-col gap-2 p-4'>
      {/* <form
        action={async (formData) => {
          'use server'
          try {
            await signIn('credentials', formData)
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${'/login'}?error=${error.type}`)
            }
            throw error
          }
        }}>
        <label htmlFor='email'>
          Email
          <input name='email' id='email' />
        </label>
        <label htmlFor='password'>
          Password
          <input name='password' id='password' />
        </label>
        <input type='submit' value='Sign In' />
      </form> */}
      {Object.values(providerInfoMap).map((provider) => (
        <ProviderButton key={provider.name} provider={provider} />
      ))}
    </div>
  )
}

function ProviderButton({
  provider,
}: {
  provider: { name: string; id: string }
}) {
  const Icons = {
    GitHub: githubIcon,
    Google: googleIcon,
  }

  return (
    <form
      key={provider.name}
      className='mx-auto'
      action={async () => {
        'use server'
        try {
          await signIn(provider.id)
        } catch (error) {
          // Signin can fail for a number of reasons, such as the user
          // not existing, or the user not having the correct role.
          // In some cases, you may want to redirect to a custom error
          if (error instanceof AuthError) {
            return redirect(`${'/login'}?error=${error.type}`)
          }

          // Otherwise if a redirects happens Next.js can handle it
          // so you can just re-thrown the error and let Next.js handle it.
          // Docs: https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
          throw error
        }
      }}>
      <Button variant='outline' type='submit' className='dark:border-muted-foreground dark:text-muted-foreground h-fit'>
        <Image
          src={Icons[provider.name as keyof typeof Icons]}
          alt={`${provider.name} icon`}
          className='mr-4 size-8'
        />
        <p className='font-extrabold m-2'>Sign in with {provider.name}</p>
      </Button>
    </form>
  )
}
