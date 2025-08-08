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
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={name}
        className="flex items-center justify-between px-2 text-sm"
      >
        <p>{label}</p>
        {issue && <p className="text-negative">{issue.message}</p>}
      </label>

      <input
        type="text"
        id={name}
        name={name}
        className="focus:border-neutral-3 border-neutral-4 placeholder:text-neutral-3 rounded-lg border px-3 py-2.5 focus:outline-none"
        {...props}
      />

      {issue && <p className="text-negative px-2 text-sm">{issue.message}</p>}
    </div>
  )
}
