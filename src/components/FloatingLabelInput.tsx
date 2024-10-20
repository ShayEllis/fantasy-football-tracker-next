import { ComponentProps, FC, ReactElement } from 'react'
import { Input as ShadcnInput } from './ui/input'
import { Label as ShadcnLabel } from './ui/label'
import { cn } from '@/lib/utils'

type InputForFloating = ComponentProps<typeof ShadcnInput> & {
  type: 'number' | 'text' | 'email' | 'password'
  id: string
  placeholder: string
}

export function InputForFloating({
  type,
  id,
  placeholder,
  className,
  ...props
}: InputForFloating) {
  return (
    <ShadcnInput
      type={type}
      id={id}
      className={cn('placeholder:text-transparent h-auto pt-7', className)}
      placeholder={placeholder}
      {...props}
    />
  )
}

type FloatingLabel = Omit<ComponentProps<typeof ShadcnLabel>, 'variant'> & {
  children: ReactElement<InputForFloating>
  htmlFor: string
  ariaLabel: string
}

export function FloatingLabel({
  children,
  htmlFor,
  ariaLabel,
  ...props
}: FloatingLabel) {
  return (
    <ShadcnLabel
      htmlFor={htmlFor}
      aria-label={ariaLabel}
      variant={'floatingLabelForInput'}
      {...props}>
      {children}
    </ShadcnLabel>
  )
}
