import { Root } from '@radix-ui/react-select'
import { ComponentProps } from 'react'

export type SelectProps = ComponentProps<typeof Root> & {
  errors?: string[]
  name: string
  label: string
  placeholder: string
  className?: string
}
