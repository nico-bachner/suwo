import type { Meta, StoryObj } from '@storybook/nextjs'

import { Button } from './button'

/**
 * A button component that can be used in various styles and contexts. It
 * supports different variants such as primary, secondary, tertiary, and
 * danger.
 *
 * You can also enable pass the `asChild` prop to render it as a different HTML
 * element. This is especially useful when you want to use a button as a link or
 * another component without adding unnecessary elements to the DOM.
 */
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
}

export default meta

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Tertiary: StoryObj<typeof Button> = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
}

export const Danger: StoryObj<typeof Button> = {
  args: {
    variant: 'danger',
    children: 'Dangerous Button',
  },
}
