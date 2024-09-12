import { handlers } from '@/auth/auth'
export const { GET, POST } = handlers

// The code below was causing issues when hosted on vercel
// export const runtime = 'edge' // edge support required to use this - same with middleware
