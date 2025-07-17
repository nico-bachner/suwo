import { Root } from '@radix-ui/react-slot'

import { cn } from '@/utils/cn'

import { ButtonProps } from './types'
import { getVariant } from './utils/get_variant'

export const Button = ({
  children,
  variant,
  asChild,
  className,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Root : 'button'

  return (
    <Component
      className={cn(
        'flex transform cursor-pointer flex-row items-center justify-center gap-2 rounded-md px-4 py-2.5 font-semibold transition-transform select-none hover:scale-105 focus:scale-105 focus:outline-none',
        getVariant(variant),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
