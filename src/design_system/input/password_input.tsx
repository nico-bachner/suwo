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
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="flex items-center justify-between px-2 text-sm"
      >
        <p>{label}</p>
        {issue && <p className="text-negative">{issue.message}</p>}
      </label>

      <Root>
        <div
          className={cn(
            'text-neutral-2 focus-within:text-neutral-1 group focus-within:border-neutral-3 border-neutral-4 flex items-center rounded-lg border pr-0.5 pl-3',
            className,
          )}
        >
          <Input
            suppressHydrationWarning
            id={name}
            name={name}
            placeholder={placeholder}
            className="flex-1 outline-none"
            {...props}
          />
          <Toggle className="focus-visible:ring-primary-3 flex items-center justify-center rounded-md outline-none focus-visible:ring-2">
            <Icon
              visible={<EyeIcon />}
              hidden={<EyeSlashIcon />}
              className="stroke-neutral-3 group-focus-within:stroke-neutral-2 box-content size-5 p-2.5"
            />
          </Toggle>
        </div>
      </Root>
    </div>
  )
}
