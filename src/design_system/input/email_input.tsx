import { AtSymbolIcon } from '@heroicons/react/24/outline'
import { StandardSchemaV1Issue } from '@tanstack/react-form'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

type EmailInputProps = ComponentProps<'input'> & {
  name: string
  label: string
  issues?: (StandardSchemaV1Issue | undefined)[]
}

export const EmailInput = ({
  issues,
  name,
  label = 'Email Address',
  placeholder = 'president@suwo.org.au',
  className,
  ...props
}: EmailInputProps) => {
  const issue = issues?.filter((issue) => issue !== undefined)[0]

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="flex items-center justify-between px-2 text-sm"
      >
        <p>{label}</p>
        {issue && <p className="text-negative">{issue.message}</p>}
      </label>

      <div
        className={cn(
          'text-neutral-2 focus-within:text-neutral-1 group focus-within:border-neutral-3 border-neutral-4 flex items-center rounded-lg border pr-3 pl-0.5',
          className,
        )}
      >
        <AtSymbolIcon className="stroke-neutral-3 group-focus-within:stroke-neutral-2 box-content size-5 p-2.5" />
        <input
          type="email"
          id={name}
          name={name}
          placeholder={placeholder}
          className="flex-1 outline-none"
          {...props}
        />
      </div>
    </div>
  )
}
