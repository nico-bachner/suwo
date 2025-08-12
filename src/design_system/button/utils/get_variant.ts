import { ButtonVariant } from '../types'

export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-4/80 text-neutral-1 backdrop-blur'
    case 'secondary':
      return 'bg-neutral-5/80 text-neutral-2 backdrop-blur'
    case 'danger':
      return 'bg-negative/80 text-neutral-1 backdrop-blur'
    default:
      variant satisfies never
  }
}
