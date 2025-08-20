import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SearchInput } from './search_input'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/Input/Search',
  component: SearchInput,
}

export default meta

export const Default: StoryObj<typeof SearchInput> = {
  args: {},
}
