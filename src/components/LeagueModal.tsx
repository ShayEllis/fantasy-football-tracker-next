'use client'

import { formSubmit } from '@/app/(mainApp)/teams/_actions/formSubmit'
import { FloatingLabel, InputForFloating } from './FloatingLabelInput'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
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
import { useRef, useState } from 'react'
import { z } from 'zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { formatCurrency } from '@/lib/formatters'

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

export function LeagueModal({ variant = 'add' }: { variant?: 'add' | 'edit' }) {
  const [date, setDate] = useState<Date>()
  const modalRef = useRef<HTMLDivElement>(null)

  const handlePointerDownOutside = (e: CustomEvent) => {
    e.preventDefault()
    console.log(e)

    if (modalRef.current) {
      modalRef.current.classList.add('scale-105')
      setTimeout(
        () =>
          modalRef.current && modalRef.current.classList.remove('scale-105'),
        200
      )
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open</Button>
      </SheetTrigger>
      <SheetContent
        ref={modalRef}
        onPointerDownOutside={handlePointerDownOutside}
        side='none'
        className='rounded-lg max-h-[95%] overflow-y-scroll'>
        <SheetHeader className='text-left'>
          <SheetTitle className='pb-4'>
            {variant === 'add' ? 'Add League' : 'Edit League'}
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className='sr-only'>
          {variant === 'add' ? 'Add a new league.' : 'Edit exsisting league.'}
        </SheetDescription>
        <form
          action={formSubmit}
          className='grid grid-cols-2 w-full items-center gap-1.5 mx-auto'>
          <div className='col-span-2'>
            <FloatingLabel htmlFor='leagueName' ariaLabel='League Name'>
              <InputForFloating
                type='text'
                id='leagueName'
                placeholder='League Name'
                name='leagueName'
                required
                disabled={variant === 'edit'}
                defaultValue={'asdfasdf'} // ****** use this to set values for edit modal? ******
              />
            </FloatingLabel>
          </div>
          <div className='col-span-2'>
            <FloatingLabel htmlFor='teamName' ariaLabel='Team Name'>
              <InputForFloating
                type='text'
                id='teamName'
                placeholder='Team Name'
                name='teamName'
                required
              />
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
                    'w-full justify-start text-left font-normal h-auto pt-7 hover:bg-transparent',
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
            <input
              type='text'
              name='draftDate'
              value={date === undefined ? 'undefined' : date.toString()}
              onChange={() => {}}
              className='hidden'
            />
          </div>
          <div>
            <Label
              htmlFor='platform'
              className='relative w-full before:top-1/2 before:absolute before:-translate-y-6 before:left-3 before:text-sm before:content-["Platform"] text-muted-foreground has-[option[value=""]:checked]:text-primary '>
              <Select name='platform' required>
                <SelectTrigger
                  id='platform'
                  className='w-full h-auto pt-7 text-primary data-[placeholder]:text-muted-foreground'>
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
          </div>
          <div>
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
                name='pickPosition'
              />
            </FloatingLabel>
          </div>
          <div className='col-span-2 w-1/2 mx-auto'>
            <FloatingLabel htmlFor='buyIn' ariaLabel='Buy-In'>
              <InputForFloating
                type='number'
                min={1}
                step='any'
                id='buyIn'
                placeholder='Buy-In'
                name='buyIn'
                required
                defaultValue={54.45}
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
                name='initialRank'
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
                name='currentRank'
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
                name='playoffTeams'
              />
            </FloatingLabel>
          </div>
          <div>
            <FloatingLabel htmlFor='payout1' ariaLabel='Payout 1'>
              <InputForFloating
                type='number'
                min={1}
                step='any'
                id='payout1'
                placeholder='Payout 1'
                name='payout1'
              />
            </FloatingLabel>
          </div>
          <div>
            <FloatingLabel htmlFor='payout2' ariaLabel='Payout 2'>
              <InputForFloating
                type='number'
                min={1}
                step='any'
                id='payout2'
                placeholder='Payout 2'
                name='payout2'
              />
            </FloatingLabel>
          </div>
          <div>
            <FloatingLabel htmlFor='payout3' ariaLabel='Payout 3'>
              <InputForFloating
                type='number'
                min={1}
                step='any'
                id='payout1'
                placeholder='Payout 3'
                name='payout3'
              />
            </FloatingLabel>
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
      </SheetContent>
    </Sheet>
  )
}
