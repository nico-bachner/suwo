import { Root } from '@radix-ui/react-dialog'
import { ComponentProps } from 'react'

export type DialogProps = Pick<
  ComponentProps<typeof Root>,
  'open' | 'onOpenChange'
> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
  title: string
  className?: string
}
