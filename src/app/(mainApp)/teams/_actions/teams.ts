'use server'

import { z } from 'zod'

const formSchema = z.object({
  leagueName: z.string().min(1).max(26),
  teamName: z.string().min(1).max(26),
  draftDate: z.string().datetime(),
  platform: z.enum(['espn', 'free', 'sleeper', 'yahoo']),
  teamCount: z.number().int(),
  pickPosition: z.number().int(),
  buyIn: z.number().int(), // Will x100 to convert and save in cents
  initialRank: z.number().int(),
  currentRank: z.number().int(),
  playoffTeams: z.number().int(),
  payout1: z.number().int(),
  payout2: z.number().int(),
  payout3: z.number().int(),
})

type FormSchema = z.infer<typeof formSchema>

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

export async function addTeam(previousState: {}, formData: FormData) {
  console.log('add team - ')
  const zodResult = formSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!zodResult.success) {
    console.log(zodResult.error)
  }
  return {}
}

export async function updateTeam(previousState: {}, formData: FormData) {
  console.log('edit team - ')
  console.log(formSchema.safeParse(formData))

  return {}
}
