import { Root } from '@radix-ui/react-slot'

import { cn } from '@/utils/cn'

import { ButtonProps } from './types'
import { getVariant } from './utils/get_variant'

export const Button = ({
  children,
  type = 'button',
  variant,
  asChild,
  className,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Root : 'button'

  return (
    <Component
      type={type}
      className={cn(
        'cursor-pointer font-semibold outline-none select-none',
        'h-10 rounded-full px-5',
        'transition-transform hover:scale-105',
        'focus-visible:ring-primary-3 focus-visible:ring-4',
        'flex items-center justify-center gap-2',
        getVariant(variant),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
