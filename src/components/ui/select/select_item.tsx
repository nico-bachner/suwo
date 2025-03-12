import { CheckIcon } from '@heroicons/react/24/outline'
import { Select } from 'radix-ui'

type SelectItemProps = {
  children: React.ReactNode
  value: string
}

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <Select.Item
    className="relative flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1 select-none hover:bg-gray-800 hover:outline-none focus:bg-gray-800 focus:outline-none"
    {...props}
  >
    <Select.ItemText className="pl-4">{children}</Select.ItemText>

    <Select.ItemIndicator>
      <CheckIcon className="h-5 w-5 stroke-gray-300" />
    </Select.ItemIndicator>
  </Select.Item>
)
