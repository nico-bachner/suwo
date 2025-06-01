import type { Meta, StoryObj } from '@storybook/nextjs'

import { Checkbox } from './checkbox'

/**
 * A checkbox component that allows users to select or deselect an option. It
 * can be used in forms or standalone to capture user preferences.
 *
 * It requires a label for better accessibility and user understanding.
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
