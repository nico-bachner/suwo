import type { Meta, StoryObj } from '@storybook/nextjs'

import { PasswordInput } from './password_input'

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Input/Password',
  component: PasswordInput,
}

export default meta

export const Default: StoryObj<typeof PasswordInput> = {
  args: {},
}
