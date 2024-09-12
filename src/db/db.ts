import { PrismaClient } from '@prisma/client'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { Pool } from '@neondatabase/serverless'

// The prisma client with adapter below is causing issues when hosted on vercel
// const prismaClientSingleton = () => {
//   // Vercel Postgres uses Neon under the hood so these adapters are needed
//   const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
//   const adapter = new PrismaNeon(neon)
//   return new PrismaClient({ adapter })
// }

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
