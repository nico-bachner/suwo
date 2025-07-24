import { ContainerProps } from './types'

export const getSize = (size: ContainerProps['size']): string => {
  switch (size) {
    case 'sm':
      return 'max-w-screen-sm'
    case 'md':
      return 'max-w-screen-md'
    case 'lg':
      return 'max-w-screen-lg'
    case 'xl':
      return 'max-w-screen-xl'
  }
}
