import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '../db/db'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
import Apple from 'next-auth/providers/apple'
import { type Provider } from 'next-auth/providers'

const providers: Provider[] = [
  // Credentials({
  //   credentials: {
  //     username: {},
  //     email: {},
  //     password: {},
  //   },
  //   authorize: async (credentials) => {
  //     try {
  //       let user = null

  //       console.log(credentials)

  //       // Use zod to validate credentials
  //       // const { email, password } = await signInSchema.parseAsync(credentials)

  //       // logic to salt and hash password
  //       const pwHash = 'a;sldkfja;lsdjfl;as1234@%&&%123sdgdfbd_adsf'

  //       // logic to verify if the user exists
  //       user = credentials // getUserFromDb(credentials.email, pwHash)

  //       if (!user) {
  //         // No user found, forward to registration page?

  //         // for now throw error
  //         throw new Error('User not found.')
  //       }
  //       // return user and profile data
  //       return credentials as any // *****Change to use retrieved from database*******
  //     } catch (error) {
  //       if (error instanceof ZodError) {
  //         // return 'null' to indicate that the credentials are invalid
  //         return null
  //       }
  //     }
  //   },
  // }),
  Google,
  // Facebook,
  // Apple,
  GitHub,
]

export const providerInfoMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    }
    return { id: provider.id, name: provider.name }
  })
  .filter((provider) => provider.id !== 'credentials')

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: '/signin',
  },
})
