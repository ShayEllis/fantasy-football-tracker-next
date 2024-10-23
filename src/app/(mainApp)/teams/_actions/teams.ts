'use server'

import { db } from '@/db/db'
import { convertToCents } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const name = z
  .string()
  .min(1, { message: 'Must contain at least 1 character' })
  .max(26, { message: 'Can contain at most 26 characters' })
const date = z.preprocess((val) => {
  if (typeof val === 'string' && val === 'undefined') return null
  return val
}, z.string().datetime().optional().nullable())
const int = z.preprocess((val) => {
  console.log('VAL', val)
  if (typeof val === 'string' && val === '') return null
  return val
}, z.coerce.number().int().positive({ message: 'Must be greater than 0' }).optional().nullable())
const requiredInt = z.preprocess((val) => {
  console.log('VAL', val)
  if (typeof val === 'string' && val === '') return null
  return val
}, z.coerce.number().int().positive({ message: 'Must be greater than 0' }))
const currency = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (val === '') return null
    return convertToCents(val)
  }
}, z.coerce.number().positive({ message: 'Must be greater than 0' }).optional().nullable())
const requiredCurrency = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (val === '') return null
    return convertToCents(val)
  }
}, z.coerce.number().positive({ message: 'Must be greater than 0' }))

const formSchema = z.object({
  leagueName: name,
  teamName: name,
  draftDate: date,
  platform: z.enum(['espn', 'free', 'sleeper', 'yahoo'], {
    message: 'Required',
  }),
  teamCount: requiredInt,
  pickPosition: int,
  buyIn: requiredCurrency,
  initialRank: int,
  currentRank: int,
  playoffTeams: int,
  payout1: currency,
  payout2: currency,
  payout3: currency,
})

type FieldErrors = z.inferFlattenedErrors<typeof formSchema>['fieldErrors']

export type FormSchema = Omit<
  z.infer<typeof formSchema>,
  'leagueName' | 'teamName' | 'platform' | 'teamCount' | 'buyIn'
> & {
  leagueName?: string
  teamName?: string
  platform?: 'espn' | 'free' | 'sleeper' | 'yahoo'
  teamCount?: number
  buyIn?: number
  formErrors?: string[]
  fieldErrors?: FieldErrors
}

const exampleFormData = {
  leagueName: 'test league',
  teamName: 'test team',
  draftDate: 'Fri Sep 13 2024 00:00:00 GMT-0700 (Pacific Daylight Time)',
  platform: 'free',
  teamCount: '34',
  pickPosition: '3',
  buyIn: '54.45',
  initialRank: '2',
  currentRank: '2',
  playoffTeams: '2',
  payout1: '23',
  payout2: '23',
  payout3: '23',
}

export async function addTeam(
  userId: string | undefined,
  previousState: {},
  formData: FormData
): Promise<FormSchema> {
  console.log('add team - ')
  const zodResult = formSchema.safeParse(Object.fromEntries(formData.entries()))
  console.log(zodResult.data)
  if (!zodResult.success) {
    const errorReason = zodResult.error.formErrors
    console.log(errorReason)
    return errorReason
  }
  console.log(userId)
  if (userId === undefined) return {} // type error otherwise

  try {
    const result = await db.fantasyLeague.create({
      data: { ...zodResult.data, userId: userId },
    })
    console.log('db result:', result)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
        return { fieldErrors: { leagueName: ['League name must be unique'] } }
      }
    }
  }
  revalidatePath('/teams')
  return {}
}

export async function updateTeam(
  userId: string | undefined,
  previousState: {},
  formData: FormData
): Promise<FormSchema> {
  console.log('edit team - ')
  const zodResult = formSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!zodResult.success) {
    const errorReason = zodResult.error.flatten()
    console.log(errorReason)
    return errorReason
  }
  revalidatePath('/teams')
  return {}
}
