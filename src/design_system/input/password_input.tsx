import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import {
  Icon,
  Input,
  Root,
  Toggle,
} from '@radix-ui/react-password-toggle-field'

import { cn } from '@/utils/cn'

import { PasswordInputProps } from './types'

export const PasswordInput = ({
  issues,
  name,
  label = 'Password',
  placeholder = 'e.g. "I<3SUWO25!"',
  className,
  ...props
}: PasswordInputProps) => {
  const issue = issues?.filter((issue) => issue !== undefined)[0]

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={name} className="flex items-center justify-between px-6">
        <p className="font-bold">{label}</p>
        {issue && <p className="text-negative-2 font-bold">{issue.message}</p>}
      </label>

      <Root>
        <div
          className={cn(
            'group flex gap-4',
            'h-12 rounded-full',
            'bg-neutral-5/80 backdrop-blur',
            'border-neutral-4/80 focus-within:border-neutral-3/80 border',
            className,
          )}
        >
          <Input
            suppressHydrationWarning
            id={name}
            name={name}
            placeholder={placeholder}
            className={cn(
              'focus:text-neutral-1/80 text-neutral-2/80 placeholder:text-neutral-3/80 focus:placeholder:text-neutral-2/80',
              'flex-grow pl-6 outline-none',
            )}
            {...props}
          />
          <Toggle
            className={cn(
              'focus-visible:ring-primary-3 flex items-center justify-center rounded-full px-6 outline-none focus-visible:ring-2',
            )}
          >
            <Icon
              visible={<EyeIcon />}
              hidden={<EyeSlashIcon />}
              className="stroke-neutral-3/80 group-focus-within:stroke-neutral-2/80 size-6"
            />
          </Toggle>
        </div>
      </Root>
    </div>
  )
}
