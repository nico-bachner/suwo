import { Root } from '@radix-ui/react-switch'
import { ComponentProps } from 'react'

export type SwitchProps = ComponentProps<typeof Root> & {
  name: string
  label: string
  className?: string
}
