import { ComponentProps } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'success'

export type ButtonProps = ComponentProps<'button'> & {
  variant: ButtonVariant
  asChild?: boolean
}
