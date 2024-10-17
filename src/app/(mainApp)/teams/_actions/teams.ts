'use server'

import { db } from '@/db/db'
import { convertToCents } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SafeParseError, z, ZodError } from 'zod'

const name = z.string().min(1).max(26)
const date = z.preprocess((val) => {
  if (typeof val === 'string' && val === 'undefined') return null
  return val
}, z.string().datetime().nullable().optional())
const int = z.preprocess((val) => {
  if (typeof val === 'string' && val === '') return null
  return val
}, z.coerce.number().int().positive().nullable())
const currency = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (val === '') return null
    return convertToCents(val)
  }
}, z.coerce.number().positive().nullable())

const formSchema = z.object({
  leagueName: name,
  teamName: name,
  draftDate: date.optional(),
  platform: z.enum(['espn', 'free', 'sleeper', 'yahoo']),
  teamCount: int,
  pickPosition: int.optional(),
  buyIn: currency,
  initialRank: int.optional(),
  currentRank: int.optional(),
  playoffTeams: int.optional(),
  payout1: currency.optional(),
  payout2: currency.optional(),
  payout3: currency.optional(),
})

type FormSchema = Omit<
  z.infer<typeof formSchema>,
  'leagueName' | 'teamName' | 'platform' | 'teamCount' | 'buyIn'
> & {
  leagueName?: string
  teamName?: string
  platform?: 'espn' | 'free' | 'sleeper' | 'yahoo'
  teamCount?: number
  buyIn?: number
  formErrors?: any
  fieldErrors?: any
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
  // const result = await db.fantasyLeague.create({
  //   data: { ...zodResult.data, User: 'asdf' }, /// *****FIX******
  // })
  // console.log('db result:', result)
  return {}
  // revalidatePath('/teams')
  // redirect('/teams') // does not unmount modal on parallel intercepting route
}

export async function updateTeam(
  previousState: {},
  formData: FormData
): Promise<FormSchema> {
  console.log('edit team - ')
  const zodResult = formSchema.safeParse(Object.fromEntries(formData.entries()))
  console.log(zodResult.data)
  if (!zodResult.success) {
    const errorReason = zodResult.error.formErrors
    console.log(errorReason)
    return errorReason
  }
  return {}
  // revalidatePath('/teams')
  // redirect('/teams') // does not unmount modal on parallel intercepting route
}
