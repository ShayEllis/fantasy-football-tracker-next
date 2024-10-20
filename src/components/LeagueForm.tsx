'use client'

import { addTeam, updateTeam } from '@/app/(mainApp)/teams/_actions/teams'
import { FloatingLabel, InputForFloating } from './FloatingLabelInput'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useContext, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { SessionContext } from '@/auth/SessionProvider'

export function LeagueForm({ variant = 'add' }: { variant?: 'add' | 'edit' }) {
  const session = useContext(SessionContext)

  const [error, formAction] = useFormState(
    variant === 'add'
      ? addTeam.bind(null, session?.user?.id)
      : updateTeam.bind(null, session?.user?.id),
    {
      fieldErrors: {
        leagueName: ['This is an error'],
        teamName: ['This is an error'],
        teamCount: ['This is an error'],
        draftDate: ['This is an error'],
        platform: ['This is an error'],
        buyIn: ['This is an error'],
        pickPosition: ['This is an error'],
        playoffTeams: ['This is an error'],
        initialRank: ['This is an error'],
        currentRank: ['This is an error'],
        payout1: ['This is an error'],
        // payout2: ['This is an error'],
        payout3: ['This is an error'],
      },
    }
  )
  const [date, setDate] = useState<Date | undefined>(undefined)
  const router = useRouter()

  console.log(error)
  console.log(error.fieldErrors)

  const handleSubmit = () => {
    // check validation
    // console.log('submit needs work')
    // console.log(error)
    // if (error.fieldErrors === undefined) router.back()
  }

  return (
    <form
      onSubmit={handleSubmit}
      action={formAction}
      className={cn(
        'grid grid-cols-2 w-full gap-1.5 mx-auto',
        'border p-6 rounded-xl'
      )}>
      <h2 className='text-left pb-3 text-lg font-bold'>
        {variant === 'add' ? 'Add League' : 'Edit League'}
      </h2>
      <div
        className={cn(
          'col-span-2 relative',
          error.fieldErrors?.leagueName &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='leagueName' ariaLabel='League Name'>
          <InputForFloating
            type='text'
            id='leagueName'
            placeholder='League Name'
            name='leagueName'
            required
            className={
              error.fieldErrors?.leagueName && 'focus-visible:ring-destructive'
            }
            disabled={variant === 'edit'}
            // defaultValue={'asdfasdf'} // ****** use this to set values for edit modal? ******
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.leagueName} />
      </div>
      <div
        className={cn(
          'col-span-2 relative',
          error.fieldErrors?.teamName &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='teamName' ariaLabel='Team Name'>
          <InputForFloating
            type='text'
            id='teamName'
            placeholder='Team Name'
            name='teamName'
            required
            className={
              error.fieldErrors?.teamName && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.teamName} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.platform && 'mb-7',
          error.fieldErrors?.draftDate &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <Label
          htmlFor='draftDate'
          className={cn(
            'absolute top-1/2 -translate-y-6 left-3 text-sm',
            date && 'text-primary/75',
            (date && error.fieldErrors?.draftDate) && 'text-destructive/75'

          )}>
          Draft Date
        </Label>
        <FieldError errorMsgArr={error?.fieldErrors?.draftDate} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              id='draftDate'
              className={cn(
                'w-full justify-start text-left font-normal h-auto pt-7 hover:bg-transparent',
                error.fieldErrors?.draftDate && 'hover:text-destructive',
                !date && 'text-primary/75',
                (!date && error.fieldErrors?.draftDate) && 'text-destructive/75'
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
        <input
          type='text'
          name='draftDate'
          value={date === undefined ? 'undefined' : date.toISOString()}
          onChange={() => {}}
          className='hidden'
        />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.platform &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <Label
          htmlFor='platform'
          className={cn(
            'relative w-full before:top-1/2 before:absolute before:-translate-y-6 before:left-3 before:text-sm before:content-["Platform"] text-primary/75 has-[option[value=""]:checked]:text-primary',
            error.fieldErrors?.platform &&
              'has-[option[value=""]:checked]:text-destructive text-destructive/75'
          )}>
          <Select name='platform' required>
            <SelectTrigger
              id='platform'
              className={cn(
                'w-full h-auto pt-7 text-primary data-[placeholder]:text-primary/75',
                error.fieldErrors?.platform && 'text-destructive data-[placeholder]:text-destructive/75'
              )}>
              <SelectValue placeholder='Select a platform' />
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
        </Label>
        <FieldError errorMsgArr={error?.fieldErrors?.platform} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.teamCount &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel
          htmlFor='teamCount'
          ariaLabel='Team Count'
          className='inline'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='teamCount'
            placeholder='Team Count'
            name='teamCount'
            required
            className={
              error.fieldErrors?.teamCount && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.teamCount} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.pickPosition &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='pickPosition' ariaLabel='Pick Position'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='pickPosition'
            placeholder='Pick Position'
            name='pickPosition'
            className={
              error.fieldErrors?.pickPosition && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.pickPosition} />
      </div>
      <div
        className={cn(
          'col-span-2 w-1/2 mx-auto relative',
          error.fieldErrors?.buyIn &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='buyIn' ariaLabel='Buy-In'>
          <InputForFloating
            type='number'
            min={0.01}
            step='.01'
            id='buyIn'
            placeholder='Buy-In'
            name='buyIn'
            required
            className={
              error.fieldErrors?.buyIn && 'focus-visible:ring-destructive'
            }
            // defaultValue={54.45}
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.buyIn} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.initialRank &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='initialRank' ariaLabel='Initial Rank'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='initialRank'
            placeholder='Initial Rank'
            name='initialRank'
            className={
              error.fieldErrors?.initialRank && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.initialRank} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.currentRank &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='currentRank' ariaLabel='Current Rank'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='currentRank'
            placeholder='Current Rank'
            name='currentRank'
            className={
              error.fieldErrors?.currentRank && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.currentRank} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.playoffTeams &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='playoffTeams' ariaLabel='Playoff Teams'>
          <InputForFloating
            type='number'
            min={1}
            step={1}
            id='playoffTeams'
            placeholder='Playoff Teams'
            name='playoffTeams'
            className={
              error.fieldErrors?.playoffTeams && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.playoffTeams} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.payout1 &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='payout1' ariaLabel='Payout 1'>
          <InputForFloating
            type='number'
            min={0.01}
            step='.01'
            id='payout1'
            placeholder='Payout 1'
            name='payout1'
            className={
              error.fieldErrors?.payout1 && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.payout1} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.payout2 &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='payout2' ariaLabel='Payout 2'>
          <InputForFloating
            type='number'
            min={0.01}
            step='.01'
            id='payout2'
            placeholder='Payout 2'
            name='payout2'
            className={
              error.fieldErrors?.payout2 && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.payout2} />
      </div>
      <div
        className={cn(
          'relative',
          error.fieldErrors?.payout3 &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <FloatingLabel htmlFor='payout3' ariaLabel='Payout 3'>
          <InputForFloating
            type='number'
            min={0.01}
            step='any'
            id='Payout 3'
            placeholder='Payout 3'
            name='payout3'
            className={
              error.fieldErrors?.payout3 && 'focus-visible:ring-destructive'
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={error?.fieldErrors?.payout3} />
      </div>
      {variant === 'edit' && (
        <Accordion
          type='single'
          collapsible
          className='col-span-2 border border-destructive rounded-lg'>
          <AccordionItem value='item-1' className='border-none'>
            <AccordionTrigger className='p-1 pl-2 rounded-t-md text-destructive data-[state="open"]:bg-destructive data-[state="open"]:text-destructive-foreground'>
              Options
            </AccordionTrigger>
            <AccordionContent className='text-destructive p-1 text-center'>
              <Button variant='destructive'>
                <Trash2 className='size-4' />
                <span className='pl-2'>Delete League</span>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <Button type='submit' className='col-span-2'>
        Submit
      </Button>
    </form>
  )
}

const FieldError = ({ errorMsgArr }: { errorMsgArr: string[] | undefined }) => {
  return (
    <div>
      {errorMsgArr && (
        <span className='text-destructive absolute left-4 bottom-[-1.75rem]'>
          {errorMsgArr[0]}
        </span>
      )}
    </div>
  )
}
