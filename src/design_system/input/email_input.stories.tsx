import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { EmailInput } from './email_input'

const meta: Meta<typeof EmailInput> = {
  title: 'Components/Input/Email',
  component: EmailInput,
}

export default meta

export const Default: StoryObj<typeof EmailInput> = {
  args: {},
}
