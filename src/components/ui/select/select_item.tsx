import { CheckIcon } from '@heroicons/react/24/outline'
import { Select } from 'radix-ui'

type SelectItemProps = {
  children: React.ReactNode
  value: string
}

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <Select.Item
    className="flex cursor-pointer items-center gap-2 border-r-4 select-none hover:bg-gray-800 hover:outline-none"
    {...props}
  >
    <Select.ItemText>{children}</Select.ItemText>

    <Select.ItemIndicator>
      <CheckIcon />
    </Select.ItemIndicator>
  </Select.Item>
)
