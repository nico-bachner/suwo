import { Slot } from 'radix-ui'

import { cn } from '@/lib/cn'

import { getVariant } from './get_variant'
import { ButtonProps } from './types'

export const Button = ({
  children,
  variant,
  asChild,
  className,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot.Root : 'button'

  return (
    <Component
      className={cn(
        'flex cursor-pointer flex-row items-center justify-center rounded-md px-4 py-2.5 font-semibold transition-colors select-none focus:outline-none',
        getVariant(variant),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
