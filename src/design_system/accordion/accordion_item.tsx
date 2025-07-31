import { Item } from '@radix-ui/react-accordion'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const AccordionItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Item>) => (
  <Item className={cn('mx-auto w-full max-w-screen-sm', className)} {...props}>
    {children}
  </Item>
)
