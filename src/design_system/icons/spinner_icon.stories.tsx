import type { Meta, StoryObj } from '@storybook/nextjs'

import { SpinnerIcon } from './spinner_icon'

const meta: Meta<typeof SpinnerIcon> = {
  title: 'Components/Icons/Spinner',
  component: SpinnerIcon,
}

export default meta

export const Default: StoryObj<typeof SpinnerIcon> = {
  args: {},
}
