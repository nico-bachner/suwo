import { ButtonVariant } from '../types'

export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-5 text-neutral-2 hover:bg-primary-4 hover:text-neutral-1 focus:bg-primary-4'
    case 'secondary':
      return 'bg-neutral-5 text-neutral-2 hover:bg-neutral-4 hover:text-neutral-1 focus:bg-neutral-4'
    case 'tertiary':
      return 'text-neutral-4 bg-neutral-5 hover:bg-neutral-4 hover:text-neutral-1 focus:bg-neutral-4'
    case 'danger':
      return 'bg-negative-4 text-neutral-2 hover:bg-negative-3 hover:text-neutral-1 focus:bg-negative-3'
    default:
      variant satisfies never
  }
}
