import {
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { cn } from '@/lib/cn'

import { DialogProps } from './types'

export const Dialog = ({
  children,
  trigger,
  title,
  className,
  ...props
}: DialogProps) => (
  <Root {...props}>
    {trigger && <Trigger asChild>{trigger}</Trigger>}

    <Portal>
      <Overlay className="fixed inset-0 bg-gray-950/50 backdrop-blur" />

      <Content
        className={cn('fixed z-50 bg-gray-950/80 backdrop-blur-lg', className)}
      >
        <VisuallyHidden>
          <Title>{title}</Title>
        </VisuallyHidden>

        {children}
      </Content>
    </Portal>
  </Root>
)
