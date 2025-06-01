import type { Meta, StoryObj } from '@storybook/nextjs'

import { Select } from './select'
import { SelectItem } from './select_item'

/** Allows users to choose from a list of options. */
const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
}

export default meta

export const Default: StoryObj<typeof Select> = {
  args: {
    children: [
      <SelectItem value="item_1">Item 1</SelectItem>,
      <SelectItem value="item_2">Item 2</SelectItem>,
      <SelectItem value="item_3">Item 3</SelectItem>,
      <SelectItem value="item_4">Item 4</SelectItem>,
      <SelectItem value="item_5">Item 5</SelectItem>,
    ],
  },
}
