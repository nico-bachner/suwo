import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Select as RadixSelect } from 'radix-ui'

import { cn } from '@/cn'

type SelectProps = React.ComponentProps<typeof RadixSelect.Root> & {
  errors?: string[]
  label: string
  placeholder: string
  className?: string
}

export const Select = ({
  children,
  errors,
  name,
  label,
  placeholder,
  className,
  ...props
}: SelectProps) => (
  <div className={cn('flex flex-col', className)}>
    <label htmlFor={name} className="px-2 py-1 text-sm text-gray-300">
      {label}
    </label>

    <RadixSelect.Root {...props} name={name}>
      <RadixSelect.Trigger
        id={name}
        className="flex items-center justify-center gap-2 rounded-md border border-gray-500 px-4 py-2 focus:outline-none data-placeholder:text-gray-500"
      >
        <RadixSelect.Value
          placeholder={placeholder}
          className="text-gray-500"
        />

        <RadixSelect.Icon>
          <ChevronDownIcon className="h-5 w-5 stroke-gray-500" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="relative overflow-hidden rounded-md border border-gray-500 bg-gray-950">
          <RadixSelect.ScrollUpButton className="absolute top-0 z-10 flex w-full flex-row items-center justify-center bg-gray-950/80 backdrop-blur">
            <ChevronUpIcon className="h-5 w-5 stroke-gray-300" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="p-2">
            {children}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="absolute bottom-0 z-10 flex w-full flex-row items-center justify-center bg-gray-950/80 backdrop-blur">
            <ChevronDownIcon className="h-5 w-5 stroke-gray-300" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>

    {errors?.map((error) => (
      <p key={error} className="px-2 py-1 text-sm text-red-500">
        {error}
      </p>
    ))}
  </div>
)
