import type { Meta, StoryObj } from '@storybook/nextjs'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}
