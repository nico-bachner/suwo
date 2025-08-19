import type { Meta, StoryObj } from '@storybook/nextjs'

import { YouTubeIcon } from './youtube_icon'

const meta: Meta<typeof YouTubeIcon> = {
  title: 'Components/Icons/YouTube',
  component: YouTubeIcon,
}

export default meta

export const Default: StoryObj<typeof YouTubeIcon> = {
  args: {},
}
