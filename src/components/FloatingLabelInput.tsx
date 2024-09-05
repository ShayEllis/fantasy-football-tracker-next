import { ComponentProps, ReactElement } from 'react'
import { Input as ShadcnInput } from './ui/input'
import { Label as ShadcnLabel } from './ui/label'

type InputForFloating = {
  type: 'number' | 'text' | 'email' | 'password'
  id: string
  placeholder: string
  props?: Omit<ComponentProps<'input'>, 'className'> // not working!
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

type FloatingLabel = {
  children: ReactElement<typeof InputForFloating>
  htmlFor: string
  ariaLabel: string
  props?: Omit<ComponentProps<'label'>, 'variant'>
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
