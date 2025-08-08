'use client'

import { EmailInput, EmailInputProps } from '@/design_system/input'

import { useFieldContext } from '../context'

export const Email = ({ ...props }: EmailInputProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>()

  return (
    <EmailInput
      name={name}
      value={state.value}
      issues={state.meta.errors}
      onBlur={handleBlur}
      onChange={({ target }) => {
        handleChange(target.value)
      }}
      {...props}
    />
  )
}
