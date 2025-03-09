import { CheckIcon } from '@heroicons/react/24/outline'
import { Select } from 'radix-ui'

type SelectItemProps = {
  children: React.ReactNode
  value: string
}

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <Select.Item
    className="flex items-center gap-2 select-none hover:outline-none"
    {...props}
  >
    <Select.ItemText>{children}</Select.ItemText>

    <Select.ItemIndicator>
      <CheckIcon />
    </Select.ItemIndicator>
  </Select.Item>
)
