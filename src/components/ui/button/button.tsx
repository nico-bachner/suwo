import { Root } from '@radix-ui/react-slot'

import { cn } from '@/lib/cn'

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
