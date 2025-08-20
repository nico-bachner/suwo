import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { YouTubeIcon } from './youtube_icon'

const meta: Meta<typeof YouTubeIcon> = {
  title: 'Components/Icons/YouTube',
  component: YouTubeIcon,
}

export default meta

export const Default: StoryObj<typeof YouTubeIcon> = {
  args: {
    className: 'size-60 stroke-neutral-1',
  },
}
