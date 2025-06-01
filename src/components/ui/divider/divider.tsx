import { Root } from '@radix-ui/react-separator'

import { cn } from '@/lib/cn'

import { DividerProps } from './types'
import { getOrientation } from './utils/get_orientation'

export const Divider = ({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: DividerProps) => (
  <Root
    decorative={decorative}
    className={cn('bg-neutral-4', getOrientation(orientation), className)}
    {...props}
  />
)
