import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: ['../src/**/*.stories.tsx', '../src/**/*.mdx'],
  addons: ['@storybook/addon-docs'],
}

export default config
