import type { Meta, StoryObj } from '@storybook/nextjs'

import { Divider } from './divider'

/**
 * A divider component that can be used to separate content in a layout. It
 * supports horizontal and vertical orientations.
 */
const meta: Meta<typeof Divider> = {
  title: 'Divider',
  component: Divider,
}

export default meta

export const Horizontal: StoryObj<typeof Divider> = {
  args: {
    orientation: 'horizontal',
  },
}

export const Vertical: StoryObj<typeof Divider> = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="flex h-36 items-center justify-center">
        <Story />
      </div>
    ),
  ],
}
