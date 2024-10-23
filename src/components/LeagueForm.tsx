'use client'

import {
  addTeam,
  FormSchema,
  updateTeam,
} from '@/app/(mainApp)/teams/_actions/teams'
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
import { useContext, useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { SessionContext } from '@/auth/SessionProvider'
import { FantasyLeague } from '@prisma/client'

export function LeagueForm({
  variant = 'add',
  data,
}: {
  variant?: 'add' | 'edit'
  data?: FantasyLeague
}) {
  const [date, setDate] = useState<Date | null | undefined>(undefined)
  const [leagueData, setLeagueData] = useState<FormSchema>({})
  const session = useContext(SessionContext)

  useEffect(() => {
    if (data) {
      const { draftDate, ...restOfData } = data
      setDate(draftDate)
      setLeagueData(restOfData)
    }
  }, [data])

  {
    // fieldErrors: {
    //   leagueName: ['This is an error'],
    //   teamName: ['This is an error'],
    //   teamCount: ['This is an error'],
    //   draftDate: ['This is an error'],
    //   platform: ['This is an error'],
    //   buyIn: ['This is an error'],
    //   pickPosition: ['This is an error'],
    //   playoffTeams: ['This is an error'],
    //   initialRank: ['This is an error'],
    //   currentRank: ['This is an error'],
    //   payout1: ['This is an error'],
    //   payout2: ['This is an error'],
    //   payout3: ['This is an error'],
    // },
  }

  const [state, formAction] = useFormState(
    variant === 'add'
      ? addTeam.bind(null, session?.user?.id)
      : updateTeam.bind(null, session?.user?.id),
    leagueData
  )
  const router = useRouter()

  console.log(state)


  const handleSubmit = () => {
    // check validation
    // console.log('submit needs work')
    // console.log(state)
    // if (state.fieldErrors === undefined) router.back()
  }

  return (
    <form
      onSubmit={handleSubmit}
      action={formAction}
      className={cn(
        'grid grid-cols-2 w-full gap-1.5 mx-auto',
        'border p-6 rounded-xl'
      )}
      noValidate>
      <h2 className='text-left pb-3 text-lg font-bold'>
        {variant === 'add' ? 'Add League' : 'Edit League'}
      </h2>
      <div
        className={cn(
          'col-span-2 relative',
          state.fieldErrors?.leagueName &&
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
              state.fieldErrors?.leagueName && 'focus-visible:ring-destructive'
            }
            disabled={variant === 'edit'}
            defaultValue={variant === 'edit' ? data?.leagueName : undefined}
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.leagueName} />
      </div>
      <div
        className={cn(
          'col-span-2 relative',
          state.fieldErrors?.teamName &&
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
              state.fieldErrors?.teamName && 'focus-visible:ring-destructive'
            }
            defaultValue={variant === 'edit' ? data?.teamName : undefined}
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.teamName} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.platform && 'mb-7',
          state.fieldErrors?.draftDate &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <Label
          htmlFor='draftDate'
          className={cn(
            'absolute top-1/2 -translate-y-6 left-3 text-sm',
            date && 'text-primary/75',
            date && state.fieldErrors?.draftDate && 'text-destructive/75'
          )}>
          Draft Date
        </Label>
        <FieldError errorMsgArr={state?.fieldErrors?.draftDate} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              id='draftDate'
              className={cn(
                'w-full justify-start text-left font-normal h-auto pt-7 hover:bg-transparent',
                state.fieldErrors?.draftDate && 'hover:text-destructive',
                !date && 'text-primary/75',
                !date && state.fieldErrors?.draftDate && 'text-destructive/75'
              )}>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'P') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date ? date : undefined}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input
          type='text'
          name='draftDate'
          value={date ? date.toISOString() : 'undefined'}
          onChange={() => {}}
          className='hidden'
        />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.platform &&
            'border rounded-md border-destructive text-destructive mb-7'
        )}>
        <Label
          htmlFor='platform'
          className={cn(
            'relative w-full before:top-1/2 before:absolute before:-translate-y-6 before:left-3 before:text-sm before:content-["Platform"] text-primary/75 has-[option[value=""]:checked]:text-primary',
            state.fieldErrors?.platform &&
              'has-[option[value=""]:checked]:text-destructive text-destructive/75'
          )}>
          <Select
            name='platform'
            required
            defaultValue={variant === 'edit' ? data?.platform : undefined}>
            <SelectTrigger
              id='platform'
              className={cn(
                'w-full h-auto pt-7 text-primary data-[placeholder]:text-primary/75',
                state.fieldErrors?.platform &&
                  'text-destructive data-[placeholder]:text-destructive/75'
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
        <FieldError errorMsgArr={state?.fieldErrors?.platform} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.teamCount &&
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
              state.fieldErrors?.teamCount && 'focus-visible:ring-destructive'
            }
            defaultValue={variant === 'edit' ? data?.teamCount : undefined}
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.teamCount} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.pickPosition &&
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
              state.fieldErrors?.pickPosition &&
              'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.pickPosition != null
                ? data?.pickPosition
                : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.pickPosition} />
      </div>
      <div
        className={cn(
          'col-span-2 w-1/2 mx-auto relative',
          state.fieldErrors?.buyIn &&
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
              state.fieldErrors?.buyIn && 'focus-visible:ring-destructive'
            }
            defaultValue={variant === 'edit' && data?.buyIn ? data?.buyIn / 100 : undefined}
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.buyIn} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.initialRank &&
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
              state.fieldErrors?.initialRank && 'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.initialRank != null
                ? data?.initialRank
                : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.initialRank} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.currentRank &&
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
              state.fieldErrors?.currentRank && 'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.currentRank
                ? data?.currentRank
                : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.currentRank} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.playoffTeams &&
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
              state.fieldErrors?.playoffTeams &&
              'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.playoffTeams
                ? data?.playoffTeams
                : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.playoffTeams} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.payout1 &&
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
              state.fieldErrors?.payout1 && 'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.payout1 ? data?.payout1 / 100 : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.payout1} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.payout2 &&
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
              state.fieldErrors?.payout2 && 'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.payout2 ? data?.payout2 / 100 : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.payout2} />
      </div>
      <div
        className={cn(
          'relative',
          state.fieldErrors?.payout3 &&
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
              state.fieldErrors?.payout3 && 'focus-visible:ring-destructive'
            }
            defaultValue={
              variant === 'edit' && data?.payout3 ? data?.payout3 / 100 : undefined
            }
          />
        </FloatingLabel>
        <FieldError errorMsgArr={state?.fieldErrors?.payout3} />
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
              <Button
                variant='destructive'
                type='button'
                onClick={() => console.log('delete')}>
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
