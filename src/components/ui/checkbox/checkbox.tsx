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
      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-gray-500 bg-gray-950 focus:border-gray-300 focus:outline-none"
      {...props}
    >
      <Indicator>
        <CheckIcon className="h-5 w-5 stroke-gray-300" />
      </Indicator>
    </Root>

    <label htmlFor={name} className="text-sm text-gray-300 select-none">
      {label}
    </label>
  </div>
)
