'use client'

import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { z } from 'zod'
import { Button } from './ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSubmit } from '@/app/_actions/editForm'

const formSchema = z.object({
  leagueName: z.string(), // *** can add .min(3) or .max(25)
  teamName: z.string(),
  draftDate: z.string().date(), // only 'yyyy-mm-dd' will pass
  platform: z.enum(['ESPN', 'Free', 'Sleeper', 'Yahoo']),
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

export function EditLeague() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   leagueName: 'a',
    // },
  })

  return (
    <div className='container'>
      <Form {...form}>
        <form action={formSubmit}>
          <FormField
            control={form.control}
            name='leagueName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test</FormLabel>
                <FormControl>
                  <Input placeholder='test' {...field} />
                </FormControl>
                <FormDescription>This is a description</FormDescription>
                <FormMessage>This is an error message</FormMessage>
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
