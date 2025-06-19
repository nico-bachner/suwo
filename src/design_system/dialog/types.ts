import { Root } from '@radix-ui/react-dialog'
import { ComponentProps, ReactNode } from 'react'

export type DialogProps = Pick<
  ComponentProps<typeof Root>,
  'open' | 'onOpenChange'
> & {
  trigger?: ReactNode
  children?: ReactNode
  title: string
  className?: string
}
