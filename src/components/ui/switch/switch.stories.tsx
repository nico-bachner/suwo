import type { Meta, StoryObj } from '@storybook/nextjs'

import { Switch } from './switch'

/**
 * Allows users to toggle between two states, such as on/off or
 * enabled/disabled.
 */
const meta: Meta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
}

export default meta

export const Default: StoryObj<typeof Switch> = {
  args: {
    name: 'switch',
    label: 'Switch Label',
  },
}
