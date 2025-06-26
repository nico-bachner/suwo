import { ComponentProps } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export type ButtonProps = ComponentProps<'button'> & {
  variant: ButtonVariant
  asChild?: boolean
}
