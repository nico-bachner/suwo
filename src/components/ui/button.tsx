import { Slot } from 'radix-ui'

import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-amber-900 text-gray-300 hover:bg-amber-700 hover:text-gray-100 focus:bg-amber-800',
  secondary:
    'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-gray-100 focus:bg-gray-800',
  tertiary:
    'text-gray-300 hover:bg-gray-900 hover:text-gray-100 focus:bg-gray-900',
}

type ButtonProps = React.ComponentProps<'button'> & {
  variant: keyof typeof variants
  asChild?: boolean
}

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
        'cursor-pointer rounded-md px-4 py-2.5 text-center font-semibold transition-colors select-none focus:outline-none',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
