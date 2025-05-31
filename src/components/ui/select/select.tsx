import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import {
  Content,
  Icon,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select'

import { cn } from '@/lib/cn'

import { InputLabel } from '../input_label'
import { SelectProps } from './types'

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

    <Root name={name} {...props}>
      <Trigger
        id={name}
        className="flex items-center justify-between gap-2 rounded-md border border-gray-500 px-4 py-2 focus:border-gray-300 focus:outline-none data-placeholder:text-gray-500"
      >
        <Value placeholder={placeholder} className="text-gray-500" />

        <Icon>
          <ChevronUpDownIcon className="h-6 w-6 stroke-gray-500" />
        </Icon>
      </Trigger>

      <Portal>
        <Content className="relative overflow-hidden rounded-md border border-gray-500 bg-gray-950">
          <ScrollUpButton className="absolute top-0 z-10 flex w-full flex-row items-center justify-center bg-gray-950/80 py-1 backdrop-blur">
            <ChevronUpIcon className="h-5 w-5 stroke-gray-300" />
          </ScrollUpButton>

          <Viewport className="p-1">{children}</Viewport>

          <ScrollDownButton className="absolute bottom-0 z-10 flex w-full flex-row items-center justify-center bg-gray-950/80 py-1 backdrop-blur">
            <ChevronDownIcon className="h-5 w-5 stroke-gray-300" />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>

    {errors && <p className="px-2 text-sm text-red-500">{errors[0]}</p>}
  </div>
)
