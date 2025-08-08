import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import {
  Icon,
  Input,
  Root,
  Toggle,
} from '@radix-ui/react-password-toggle-field'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const PasswordInput = ({
  className,
  ...props
}: ComponentProps<typeof Input>) => (
  <Root>
    <div
      className={cn(
        'text-neutral-2 focus-within:text-neutral-1 group focus-within:border-neutral-3 border-neutral-4 flex items-center rounded-lg border pr-0.5 pl-3',
        className,
      )}
    >
      <Input
        suppressHydrationWarning
        placeholder='e.g. "I<3SUWO25!"'
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
)
