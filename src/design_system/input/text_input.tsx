import { cn } from '@/utils/cn'

import { TextInputProps } from './types'

export const TextInput = ({
  issues,
  name,
  label = 'Password',
  className,
  ...props
}: TextInputProps) => {
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
        <input
          type="text"
          id={name}
          name={name}
          className="flex-1 outline-none"
          {...props}
        />
      </div>
    </div>
  )
}
