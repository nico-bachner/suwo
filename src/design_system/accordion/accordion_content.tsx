import { Content } from '@radix-ui/react-accordion'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const AccordionContent = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Content>) => (
  <Content className={cn('prose px-8 pt-4 pb-2', className)} {...props}>
    <p>{children}</p>
  </Content>
)
