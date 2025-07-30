import { Container } from './container'
import { ContainerProps } from './types'

export const PageContainer = ({
  children,
  className,
  ...props
}: ContainerProps) => (
  <div className="flex-1 px-4 pt-12 pb-20">
    <Container {...props} className={className}>
      {children}
    </Container>
  </div>
)
