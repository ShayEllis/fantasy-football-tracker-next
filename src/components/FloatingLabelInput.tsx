import { ComponentProps, FC, ReactElement } from 'react'
import { Input as ShadcnInput } from './ui/input'
import { Label as ShadcnLabel } from './ui/label'

type InputForFloating = Omit<
  ComponentProps<typeof ShadcnInput>,
  'className'
> & {
  type: 'number' | 'text' | 'email' | 'password'
  id: string
  placeholder: string
}

export function InputForFloating({
  type,
  id,
  placeholder,
  ...props
}: InputForFloating) {
  return (
    <ShadcnInput
      type={type}
      id={id}
      className='placeholder:text-transparent h-auto pt-7'
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
