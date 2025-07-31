import { Root } from '@radix-ui/react-accordion'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const Accordion = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Root>) => (
  <Root className={cn('flex flex-col gap-2', className)} {...props}>
    {children}
  </Root>
)
