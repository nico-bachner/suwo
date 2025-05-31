import { ButtonVariant } from './types'

export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-amber-900 text-gray-300 hover:bg-amber-800 hover:text-gray-100 focus:bg-amber-800'
    case 'secondary':
      return 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-gray-100 focus:bg-gray-800'
    case 'tertiary':
      return 'text-gray-300 hover:bg-gray-900 hover:text-gray-100 focus:bg-gray-900'
    case 'danger':
      return 'bg-red-900 text-gray-300 hover:bg-red-800 hover:text-gray-100 focus:bg-red-800'
    default:
      variant satisfies never
  }
}
