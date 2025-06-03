import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/nextjs'

import { Icon } from './icon'

/** Allows users to choose from a list of options. */
const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
}

export default meta

export const Small: StoryObj<typeof Icon> = {
  args: {
    icon: InformationCircleIcon,
    size: 'sm',
  },
}

export const Medium: StoryObj<typeof Icon> = {
  args: {
    icon: InformationCircleIcon,
    size: 'md',
  },
}

export const Large: StoryObj<typeof Icon> = {
  args: {
    icon: InformationCircleIcon,
    size: 'lg',
  },
}
