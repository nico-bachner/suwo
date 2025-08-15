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
      <label htmlFor={name} className="flex items-center justify-between px-6">
        <p className="font-bold">{label}</p>
        {issue && <p className="text-negative-2 font-bold">{issue.message}</p>}
      </label>

      <input
        type="text"
        id={name}
        name={name}
        className={cn(
          'h-12 rounded-full px-6 outline-none',
          'bg-neutral-5/80 backdrop-blur',
          'border-neutral-4/80 focus:border-neutral-3/80 border',
          'focus:text-neutral-1/80 text-neutral-2/80 placeholder:text-neutral-3/80 focus:placeholder:text-neutral-2/80',
        )}
        {...props}
      />
    </div>
  )
}
