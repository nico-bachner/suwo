'use client'

import { TextInput, TextInputProps } from '@/design_system/input'

import { useFieldContext } from '../context'

export const Text = ({ ...props }: TextInputProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>()

  return (
    <TextInput
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
