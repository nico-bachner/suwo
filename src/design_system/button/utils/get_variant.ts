import { ButtonVariant } from '../types'

export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-4 text-neutral-1'
    case 'secondary':
      return 'bg-neutral-5 text-neutral-2'
    case 'danger':
      return 'bg-negative text-neutral-1'
    default:
      variant satisfies never
  }
}
