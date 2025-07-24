import { Root } from '@radix-ui/react-slot'

import { cn } from '@/utils/cn'

import { getSize } from './get_size'
import { ContainerProps } from './types'

export const Container = ({
  children,
  size = 'sm',
  asChild,
  className,
}: ContainerProps) => {
  const Component = asChild ? Root : 'div'

  return (
    <Component className={cn('mx-auto w-full', getSize(size), className)}>
      {children}
    </Component>
  )
}
