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

import { cn } from '@/utils/cn'

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
        className="border-neutral-3 data-placeholder:text-neutral-3 focus:border-neutral-2 flex items-center justify-between gap-2 rounded-md border px-4 py-2 focus:outline-none"
      >
        <Value placeholder={placeholder} className="text-neutral-3" />

        <Icon>
          <ChevronUpDownIcon className="stroke-neutral-3 h-6 w-6" />
        </Icon>
      </Trigger>

      <Portal>
        <Content className="border-neutral-3 bg-neutral-7 relative overflow-hidden rounded-md border">
          <ScrollUpButton className="bg-neutral-7/80 absolute top-0 z-10 flex w-full flex-row items-center justify-center py-1 backdrop-blur">
            <ChevronUpIcon className="stroke-neutral-2 h-5 w-5" />
          </ScrollUpButton>

          <Viewport className="p-1">{children}</Viewport>

          <ScrollDownButton className="bg-neutral-7/80 absolute bottom-0 z-10 flex w-full flex-row items-center justify-center py-1 backdrop-blur">
            <ChevronDownIcon className="stroke-neutral-2 h-5 w-5" />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>

    {errors && <p className="px-2 text-sm text-red-500">{errors[0]}</p>}
  </div>
)
