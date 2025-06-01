import type { Meta, StoryObj } from '@storybook/nextjs'

import { Checkbox } from './checkbox'

/**
 * Allows users to select or deselect an option. Can be used in forms or
 * standalone to capture user preferences.
 *
 * Requires a label for better accessibility and user understanding.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
}

export default meta

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    name: 'checkbox',
    label: 'Checkbox Label',
  },
}
