export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'

export type ButtonProps = React.ComponentProps<'button'> & {
  variant: ButtonVariant
  asChild?: boolean
}
