import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToCents = (val: string) => {
  let cents
  if (!val.includes('.')) {
    cents = val.concat('00')
  } else {
    const currArr = val.split('.')
    return currArr[0].concat(currArr[1].substring(0, 2).padEnd(2, '0'))
  }
  return cents
}