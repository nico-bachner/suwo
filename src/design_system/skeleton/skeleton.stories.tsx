import type { Meta, StoryObj } from '@storybook/nextjs'

import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Button',
  component: Skeleton,
}

export default meta

export const Default: StoryObj<typeof Skeleton> = {
  args: {},
}
