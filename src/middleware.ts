// Need Prisma edge drivers for this - same with route.ts 'edge' settings
// export const runtime = 'edge'
// Using middleware to protect routes - figure out how to chain?
// export { auth as middleware } from './auth/auth'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './auth/actions/getSession'

export default async function middleware(request: NextRequest) {
  const session = await getSession()

  if (session === null) {
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
