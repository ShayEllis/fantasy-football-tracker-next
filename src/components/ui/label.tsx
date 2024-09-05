'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        floatingLabelForInput: `relative 
            before:transition-all before:content-[attr(aria-label)] before:absolute before:pointer-events-none before:top-1/2 before:-translate-y-1/2 before:left-3 before:text-lg
            has-[input:focus]:before:text-sm has-[input:autofill]:before:text-sm has-[:not(input:placeholder-shown)]:before:text-sm
            has-[input:focus]:before:-translate-y-6 has-[input:autofill]:before:-translate-y-6 has-[:not(input:placeholder-shown)]:before:-translate-y-6
            has-[input:focus]:before:text-muted-foreground has-[input:autofill]:before:text-muted-foreground has-[:not(input:placeholder-shown)]:before:text-muted-foreground`,
      },
    },
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ variant, className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, className }) )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
