import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TextInput } from './text_input'

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/Text',
  component: TextInput,
}

export default meta

export const Default: StoryObj<typeof TextInput> = {
  args: {},
}
