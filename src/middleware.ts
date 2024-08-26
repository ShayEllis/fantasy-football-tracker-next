// Need Prisma edge drivers for this - same with route.ts 'edge' settings
export const runtime = 'experimental-edge'
export { auth as middleware } from './auth/auth'

// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { auth } from "./auth/auth";

// export async function middleware(request: NextRequest)  {
// const session = await auth()

// if (!session) {
//     console.log('********* REDIRECT ************')
//     return NextResponse.redirect(new URL('/signin', request.nextUrl.origin))
// }

// console.log('GOOD!')
// }
