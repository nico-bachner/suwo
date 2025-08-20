import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Spinner } from './spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
}

export default meta

export const Default: StoryObj<typeof Spinner> = {
  args: {},
}
