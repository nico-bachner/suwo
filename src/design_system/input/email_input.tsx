import { cn } from '@/utils/cn'

import { EmailInputProps } from './types'

export const EmailInput = ({
  issues,
  name,
  label = 'Email Address',
  placeholder = 'e.g. "president@suwo.org.au"',
  className,
  ...props
}: EmailInputProps) => {
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
        type="email"
        id={name}
        name={name}
        placeholder={placeholder}
        className="text-neutral-2 focus:text-neutral-1 focus:border-neutral-3 border-neutral-4 rounded-lg border px-4 py-3 outline-none"
        {...props}
      />
    </div>
  )
}
