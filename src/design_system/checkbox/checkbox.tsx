import { CheckIcon } from '@heroicons/react/24/outline'
import { Indicator, Root } from '@radix-ui/react-checkbox'

import { cn } from '@/utils/cn'

import { CheckboxProps } from './types'

export const Checkbox = ({
  name,
  label,
  className,
  ...props
}: CheckboxProps) => (
  <div className={cn('flex flex-row items-center gap-2', className)}>
    <Root
      id={name}
      name={name}
      className="border-neutral-3 bg-neutral-7 focus:border-neutral-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded border outline-none"
      {...props}
    >
      <Indicator>
        <CheckIcon className="stroke-neutral-2 h-5 w-5" />
      </Indicator>
    </Root>

    <label htmlFor={name} className="text-neutral-2 text-sm select-none">
      {label}
    </label>
  </div>
)
