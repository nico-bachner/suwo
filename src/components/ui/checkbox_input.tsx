import { CheckIcon } from '@heroicons/react/24/outline'
import { Checkbox } from 'radix-ui'

import { cn } from '@/cn'

type CheckboxInputProps = React.ComponentProps<typeof Checkbox.Root> & {
  name: string
  label: string
  className?: string
}

export const CheckboxInput = ({
  name,
  label,
  className,
  ...props
}: CheckboxInputProps) => (
  <div className={cn('flex flex-row items-center gap-2', className)}>
    <Checkbox.Root
      id={name}
      name={name}
      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-gray-500 bg-gray-950 focus:border-gray-300 focus:outline-none"
      {...props}
    >
      <Checkbox.Indicator>
        <CheckIcon className="h-5 w-5 stroke-gray-300" />
      </Checkbox.Indicator>
    </Checkbox.Root>

    <label htmlFor={name} className="text-sm text-gray-300">
      {label}
    </label>
  </div>
)
