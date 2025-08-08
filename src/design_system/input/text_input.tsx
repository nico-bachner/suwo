import { StandardSchemaV1Issue } from '@tanstack/react-form'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

import { InputLabel } from '../input_label'

type TextInputProps = ComponentProps<'input'> & {
  issues?: (StandardSchemaV1Issue | undefined)[]
  type?: 'text' | 'email'
  name: string
  label: string
  className?: string
}

export const TextInput = ({
  issues,
  type = 'text',
  name,
  label,
  required,
  className,
  ...props
}: TextInputProps) => {
  const issue = issues?.filter((issue) => issue !== undefined)[0]

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <InputLabel label={label} htmlFor={name} required={required} />

      <input
        type={type}
        name={name}
        id={name}
        className="focus:border-neutral-2 border-neutral-3 placeholder:text-neutral-3 rounded-md border px-3 py-2 focus:outline-none"
        {...props}
      />

      {issue && <p className="text-negative px-2 text-sm">{issue.message}</p>}
    </div>
  )
}
