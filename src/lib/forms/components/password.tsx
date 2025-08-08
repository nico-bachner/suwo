'use client'

import { PasswordInput, PasswordInputProps } from '@/design_system/input'

import { useFieldContext } from '../context'

export const Password = ({ ...props }: PasswordInputProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>()

  return (
    <PasswordInput
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
