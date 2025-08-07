'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import {
  Icon,
  Input,
  Root,
  Toggle,
} from '@radix-ui/react-password-toggle-field'
import { ComponentProps } from 'react'

import { useFieldContext } from '@/lib/forms/context'
import { cn } from '@/utils/cn'

export const PasswordInput = ({
  className,
  ...props
}: ComponentProps<typeof Input>) => {
  const { state, handleChange } = useFieldContext<string>()

  return (
    <Root {...props}>
      <div
        className={cn(
          'bg-neutral-7 text-neutral-1 border-neutral-4 flex items-center rounded-md border',
          className,
        )}
      >
        <Input
          suppressHydrationWarning
          value={state.value}
          onChange={({ target }) => {
            handleChange(target.value)
          }}
          placeholder='e.g. "I<3SUWO25!"'
          className="selection:bg-neutral-4 selection:text-neutral-1 flex-1 pl-3 outline-none"
        />
        <Toggle className="focus-visible:ring-primary-4 flex items-center justify-center outline-none focus-visible:ring">
          <Icon
            visible={<EyeIcon />}
            hidden={<EyeSlashIcon />}
            className="box-content size-5 p-2.5"
          />
        </Toggle>
      </div>
    </Root>
  )
}
