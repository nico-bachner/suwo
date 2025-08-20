import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FacebookIcon } from './facebook_icon'

const meta: Meta<typeof FacebookIcon> = {
  title: 'Components/Icons/Facebook',
  component: FacebookIcon,
}

export default meta

export const Default: StoryObj<typeof FacebookIcon> = {
  args: {
    className: 'size-60 stroke-neutral-1',
  },
}
