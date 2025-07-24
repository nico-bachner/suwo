import { cn } from '@/utils/cn'

import { Container } from './container'
import { ContainerProps } from './types'

export const PageContainer = ({
  children,
  className,
  ...props
}: ContainerProps) => (
  <Container {...props} className={cn('flex-1 px-4 pt-8 pb-16', className)}>
    {children}
  </Container>
)
