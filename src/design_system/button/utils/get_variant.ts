import { ButtonVariant } from '../types'

export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-3/80 text-primary-1 backdrop-blur inset-shadow-xs inset-shadow-primary-1'
    case 'secondary':
      return 'bg-neutral-4/80 text-neutral-2 backdrop-blur inset-shadow-xs inset-shadow-neutral-2'
    case 'tertiary':
      return 'bg-transparent border border-neutral-4/80 text-neutral-2 backdrop-blur'
    case 'danger':
      return 'bg-negative-3/80 text-negative-1 backdrop-blur inset-shadow-xs inset-shadow-negative-1'
    case 'success':
      return 'bg-positive-3/80 text-positive-1 backdrop-blur inset-shadow-xs inset-shadow-positive-1'
    default:
      variant satisfies never
  }
}
