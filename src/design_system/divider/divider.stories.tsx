import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Divider } from './divider'

/**
 * Can be used to separate content in a layout. Supports horizontal and vertical
 * orientations.
 */
const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
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
