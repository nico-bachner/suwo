import { DividerOrientation } from '../types'

export const getOrientation = (orientation: DividerOrientation) => {
  switch (orientation) {
    case 'horizontal':
      return 'h-px w-full'
    case 'vertical':
      return 'w-px h-full'
    default:
      orientation satisfies never
  }
}
