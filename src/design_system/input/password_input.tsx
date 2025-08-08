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
        'bg-neutral-7 text-neutral-1 border-neutral-4 flex items-center rounded-md border',
        className,
      )}
    >
      <Input
        suppressHydrationWarning
        placeholder='e.g. "I<3SUWO25!"'
        className="selection:bg-neutral-4 selection:text-neutral-1 flex-1 pl-3 outline-none"
        {...props}
      />
      <Toggle className="focus-visible:ring-primary-3 flex items-center justify-center rounded-md outline-none focus-visible:ring-2">
        <Icon
          visible={<EyeIcon />}
          hidden={<EyeSlashIcon />}
          className="box-content size-5 p-2.5"
        />
      </Toggle>
    </div>
  </Root>
)
