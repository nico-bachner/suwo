import type { Meta, StoryObj } from '@storybook/nextjs'

import { InstagramIcon } from './instagram_icon'

const meta: Meta<typeof InstagramIcon> = {
  title: 'Components/Icons/Instagram',
  component: InstagramIcon,
}

export default meta

export const Default: StoryObj<typeof InstagramIcon> = {
  args: {},
}
