import { JSX, ReactNode } from 'react'

import { cn } from '@/utils/cn'

type HeadingProps = {
  children: ReactNode
  as: keyof JSX.IntrinsicElements
  variant: 'primary' | 'secondary' | 'tertiary'
  className?: string
}

const getVariant = (variant: HeadingProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'text-3xl font-bold sm:text-4xl'
    case 'secondary':
      return 'text-2xl font-semibold sm:text-3xl'
    case 'tertiary':
      return 'text-xl font-medium sm:text-2xl'
    default:
      variant satisfies never
  }
}

export const Heading = ({ children, as, variant, className }: HeadingProps) => {
  const Component = as

  return (
    <Component
      className={cn(
        'text-neutral-1 font-serif',
        getVariant(variant),
        className,
      )}
    >
      {children}
    </Component>
  )
}
