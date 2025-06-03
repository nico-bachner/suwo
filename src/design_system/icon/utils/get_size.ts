import { IconSize } from '../types'

export const getSize = (size: IconSize) => {
  switch (size) {
    case 'sm':
      return 'h-4 w-4'
    case 'md':
      return 'h-6 w-6'
    case 'lg':
      return 'h-8 w-8'
    default:
      size satisfies never
  }
}
