'use client'

import { DateTimeInput, DateTimeInputProps } from '@/design_system/input'

import { useFieldContext } from '../context'

export const DateTime = ({ ...props }: DateTimeInputProps) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>()

  return (
    <DateTimeInput
      name={name}
      value={state.value}
      issues={state.meta.errors}
      onBlur={handleBlur}
      onChange={({ target }) => {
        handleChange(target.value)
        console.log('DateTime input changed:', target.value)
      }}
      {...props}
    />
  )
}
