import { Content } from '@radix-ui/react-accordion'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const AccordionContent = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Content>) => (
  <Content className={cn('prose p-5', className)} {...props}>
    <p>{children}</p>
  </Content>
)
