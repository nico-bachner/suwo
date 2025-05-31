import { Root } from '@radix-ui/react-separator'
import { ComponentProps } from 'react'

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerProps = Pick<
  ComponentProps<typeof Root>,
  'decorative' | 'className'
> & {
  orientation?: DividerOrientation
  decorative?: ComponentProps<typeof Root>['decorative']
  className?: string
}
