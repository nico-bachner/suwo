import { Separator } from 'radix-ui'

import { cn } from '@/lib/cn'

const orientations = {
  horizontal: 'h-px w-full',
  vertical: 'w-px h-full',
}

type DividerProps = React.ComponentProps<typeof Separator.Root> & {
  className?: string
}

export const Divider = ({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: DividerProps) => (
  <Separator.Root
    decorative={decorative}
    className={cn('bg-gray-700', orientations[orientation], className)}
    {...props}
  />
)
