import { CheckIcon } from '@heroicons/react/24/outline'
import { Checkbox } from 'radix-ui'

import { cn } from '@/cn'

type CheckboxInputProps = {
  name: string
  label: string
  className?: string
}

export const CheckboxInput = ({
  name,
  label,
  className,
}: CheckboxInputProps) => (
  <div
    className={cn('flex flex-row items-center justify-center gap-4', className)}
  >
    <label htmlFor={name} className="text-sm text-gray-300">
      {label}
    </label>

    <Checkbox.Root
      id={name}
      name={name}
      className="flex h-5 w-5 items-center justify-center rounded border border-gray-500 bg-gray-900"
    >
      <Checkbox.Indicator>
        <CheckIcon className="h-5 w-5 stroke-gray-300" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
)
