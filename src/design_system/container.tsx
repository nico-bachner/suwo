import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type ContainerProps = {
  children: ReactNode
  size: 'sm' | 'md' | 'lg'
  className?: string
}

const getSize = (size: ContainerProps['size']): string => {
  switch (size) {
    case 'sm':
      return 'max-w-screen-sm'
    case 'md':
      return 'max-w-screen-md'
    case 'lg':
      return 'max-w-screen-lg'
  }
}

export const Container = ({
  children,
  size = 'sm',
  className,
}: ContainerProps) => (
  <div className={cn('mx-auto w-full px-4 py-8', getSize(size), className)}>
    {children}
  </div>
)
