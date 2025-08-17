import { Root } from '@radix-ui/react-slot'

import { cn } from '@/utils/cn'

import { ButtonProps } from './types'
import { getVariant } from './utils/get_variant'

export const Button = ({
  children,
  type = 'button',
  variant,
  disabled = false,
  asChild,
  className,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Root : 'button'

  return (
    <Component
      type={type}
      className={cn(
        'font-semibold select-none',
        'h-10 rounded-full px-5',
        'outline-offset-2 focus-visible:outline-4',
        'flex items-center justify-center gap-2',
        getVariant(variant),
        disabled
          ? 'cursor-not-allowed grayscale'
          : 'cursor-pointer transition-transform hover:scale-105',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
