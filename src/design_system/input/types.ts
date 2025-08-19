import { Input } from '@radix-ui/react-password-toggle-field'
import { StandardSchemaV1Issue } from '@tanstack/react-form'
import { ComponentProps } from 'react'

export type DateTimeInputProps = ComponentProps<'input'> & {
  name?: string
  label?: string
  issues?: (StandardSchemaV1Issue | undefined)[]
}

export type EmailInputProps = ComponentProps<'input'> & {
  name?: string
  label?: string
  issues?: (StandardSchemaV1Issue | undefined)[]
}

export type PasswordInputProps = ComponentProps<typeof Input> & {
  name?: string
  label?: string
  issues?: (StandardSchemaV1Issue | undefined)[]
}

export type TextInputProps = ComponentProps<'input'> & {
  name?: string
  label?: string
  issues?: (StandardSchemaV1Issue | undefined)[]
}
