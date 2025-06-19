import { CheckIcon } from '@heroicons/react/24/outline'
import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select'
import { ReactNode } from 'react'

type SelectItemProps = {
  children: ReactNode
  value: string
}

export const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <Item
    className="relative flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1 select-none hover:bg-gray-800 hover:outline-none focus:bg-gray-800 focus:outline-none"
    {...props}
  >
    <ItemText className="pl-4">{children}</ItemText>

    <ItemIndicator>
      <CheckIcon className="h-5 w-5 stroke-gray-300" />
    </ItemIndicator>
  </Item>
)
