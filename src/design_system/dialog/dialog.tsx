import {
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { cn } from '@/utils/cn'

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
      <Overlay className="bg-neutral-7/50 fixed inset-0 backdrop-blur" />

      <Content
        className={cn('bg-neutral-7/50 fixed z-50 backdrop-blur-lg', className)}
      >
        <VisuallyHidden>
          <Title>{title}</Title>
        </VisuallyHidden>

        {children}
      </Content>
    </Portal>
  </Root>
)
