import { ButtonVariant } from '../types'

export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-3/50 text-primary-1 backdrop-blur border border-primary-2/50'
    case 'secondary':
      return 'bg-neutral-4/50 text-neutral-2 backdrop-blur border border-neutral-3/50'
    case 'tertiary':
      return 'bg-transparent border border-neutral-4/80 text-neutral-2 backdrop-blur'
    case 'danger':
      return 'bg-negative-3/80 text-negative-1 backdrop-blur border border-negative-2/50'
    case 'success':
      return 'bg-positive-3/80 text-positive-1 backdrop-blur border border-positive-2/50'
    default:
      variant satisfies never
  }
}
