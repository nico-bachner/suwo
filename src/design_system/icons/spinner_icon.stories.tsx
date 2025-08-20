import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SpinnerIcon } from './spinner_icon'

const meta: Meta<typeof SpinnerIcon> = {
  title: 'Components/Icons/Spinner',
  component: SpinnerIcon,
}

export default meta

export const Default: StoryObj<typeof SpinnerIcon> = {
  args: {
    className: 'size-60 stroke-neutral-1',
  },
}
