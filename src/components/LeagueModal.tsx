'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { InputForFloating, FloatingLabel } from './FloatingLabelInput'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'

// add server action with zod validaation in path

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

export function LeagueModal() {
  const [date, setDate] = useState<Date>()

  console.log(date)

  return (
    <form className='grid grid-cols-2 w-full max-w-sm items-center gap-1.5 mx-auto border p-2 rounded'>
      <div className='col-span-2'>
        <FloatingLabel htmlFor='leagueName' ariaLabel='League Name'>
          <InputForFloating
            type='text'
            id='leagueName'
            placeholder='League Name'
          />
        </FloatingLabel>
      </div>
      <div className='col-span-2'>
        <FloatingLabel htmlFor='teamName' ariaLabel='Team Name'>
          <InputForFloating type='text' id='teamName' placeholder='Team Name' />
        </FloatingLabel>
      </div>
      <div className='relative'>
        <Label
          htmlFor='draftDate'
          className={cn(
            'absolute top-1/2 -translate-y-6 left-3 text-sm',
            date && 'text-muted-foreground'
          )}>
          Draft Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              id='draftDate'
              className={cn(
                'w-full justify-start text-left font-normal h-auto pt-7',
                !date && 'text-muted-foreground'
              )}>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'P') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='relative'>
        <Label
          htmlFor='platform'
          className='absolute top-1/2 -translate-y-6 left-3 text-sm'>
          Platform
        </Label>
        <Select>
          <SelectTrigger id='platform' className='w-full h-auto pt-7 data-[placeholder]:text-muted-foreground'>
            <SelectValue placeholder='Select a platform'/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='espn'>ESPN</SelectItem>
              <SelectItem value='free'>Free</SelectItem>
              <SelectItem value='sleeper'>Sleeper</SelectItem>
              <SelectItem value='yahoo'>Yahoo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <FloatingLabel htmlFor='teamCount' ariaLabel='Team Count'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='teamCount'
            placeholder='Team Count'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='pickPosition' ariaLabel='Pick Position'>
          <InputForFloating
            type='text'
            min={1}
            step={1}
            id='pickPosition'
            placeholder='Pick Position'
          />
        </FloatingLabel>
      </div>
      <div className='col-span-2 w-1/2 mx-auto'>
        <FloatingLabel htmlFor='buyIn' ariaLabel='Buy-In'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='buyIn'
            placeholder='Buy-In'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='initialRank' ariaLabel='Initial Rank'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='initialRank'
            placeholder='Initial Rank'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='currentRank' ariaLabel='Current Rank'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='currentRank'
            placeholder='Current Rank'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='playoffTeams' ariaLabel='Playoff Teams'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='playoffTeams'
            placeholder='Playoff Teams'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='payout1' ariaLabel='Payout 1'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='payout1'
            placeholder='Payout 1'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='payout2' ariaLabel='Payout 2'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='payout2'
            placeholder='Payout 2'
          />
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel htmlFor='payout3' ariaLabel='Payout 3'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='payout1'
            placeholder='Payout 3'
          />
        </FloatingLabel>
      </div>
    </form>
  )
}
