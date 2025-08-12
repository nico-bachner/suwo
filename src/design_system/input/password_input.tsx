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
      <label
        htmlFor={name}
        className="flex items-center justify-between px-6 text-sm"
      >
        <p>{label}</p>
        {issue && <p className="text-negative">{issue.message}</p>}
      </label>

      <Root>
        <div className="text-neutral-2 focus-within:text-neutral-1 bg-neutral-7/80 group focus-within:border-neutral-4/80 border-neutral-5/80 flex h-12 rounded-full border backdrop-blur">
          <Input
            suppressHydrationWarning
            id={name}
            name={name}
            placeholder={placeholder}
            className="text-neutral-3/80 group-focus-within:text-neutral-1/80 flex-1 pl-6 outline-none"
            {...props}
          />
          <Toggle className="focus-visible:ring-primary-3 flex items-center justify-center rounded-full px-6 outline-none focus-visible:ring-2">
            <Icon
              visible={<EyeIcon />}
              hidden={<EyeSlashIcon />}
              className="stroke-neutral-4/80 group-focus-within:stroke-neutral-1/80 box-content size-6"
            />
          </Toggle>
        </div>
      </Root>
    </div>
  )
}
