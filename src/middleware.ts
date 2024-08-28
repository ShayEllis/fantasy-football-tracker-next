// Need Prisma edge drivers for this - same with route.ts 'edge' settings
export const runtime = 'experimental-edge'
// Using middleware to protect routes - figure out how to chain?
// export { auth as middleware } from './auth/auth'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth/auth'

export default async function middleware(request: NextRequest) {
  const session = await auth()

  console.log(request.nextUrl.pathname)

  if (
    !session ||
    (session?.expires && Date.parse(session?.expires) <= Date.now())
  ) {
    console.log('middleware redirect')
    return NextResponse.redirect(new URL('/home', request.nextUrl.origin))
  }
}

export const config = {
  matcher: ['/', '/dashboard'],
}

// Get typescript error, may come back to this
// import { chain } from '@next-safe/middleware'
// import { auth as authMiddleware } from './auth/auth'
// export default chain(
//   protectedRoutes,
//   authMiddleware
// )
