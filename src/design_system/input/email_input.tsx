import { AtSymbolIcon } from '@heroicons/react/24/outline'

import { cn } from '@/utils/cn'

import { EmailInputProps } from './types'

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
    <div className={cn('flex h-18 flex-col gap-1', className)}>
      <label
        htmlFor={name}
        className="flex items-center justify-between px-2 text-sm"
      >
        <p>{label}</p>
        {issue && <p className="text-negative">{issue.message}</p>}
      </label>

      <div
        className={cn(
          'flex flex-1 items-center gap-3 px-3',
          'text-neutral-2 focus-within:text-neutral-1 group focus-within:border-neutral-3 border-neutral-4 rounded-lg border',
        )}
      >
        <AtSymbolIcon className="stroke-neutral-3 group-focus-within:stroke-neutral-2 size-5" />
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
