import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { Select as RadixSelect } from 'radix-ui'
import { ZodIssue } from 'zod'

import { cn } from '@/lib/cn'

import { InputLabel } from '../input_label'

type SelectProps = React.ComponentProps<typeof RadixSelect.Root> & {
  errors?: ZodIssue[]
  name: string
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
  required,
  className,
  ...props
}: SelectProps) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <InputLabel label={label} htmlFor={name} required={required} />

    <RadixSelect.Root name={name} {...props}>
      <RadixSelect.Trigger
        id={name}
        className="flex items-center justify-between gap-2 rounded-md border border-gray-500 px-4 py-2 focus:border-gray-300 focus:outline-none data-placeholder:text-gray-500"
      >
        <RadixSelect.Value
          placeholder={placeholder}
          className="text-gray-500"
        />

        <RadixSelect.Icon>
          <ChevronUpDownIcon className="h-6 w-6 stroke-gray-500" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="relative overflow-hidden rounded-md border border-gray-500 bg-gray-950">
          <RadixSelect.ScrollUpButton className="absolute top-0 z-10 flex w-full flex-row items-center justify-center bg-gray-950/80 py-1 backdrop-blur">
            <ChevronUpIcon className="h-5 w-5 stroke-gray-300" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="p-1">
            {children}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="absolute bottom-0 z-10 flex w-full flex-row items-center justify-center bg-gray-950/80 py-1 backdrop-blur">
            <ChevronDownIcon className="h-5 w-5 stroke-gray-300" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>

    {errors?.map(({ message }) => (
      <p key={message} className="px-2 text-sm text-red-500">
        {message}
      </p>
    ))}
  </div>
)
