import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../src/**/*.stories.tsx', '../src/**/*.mdx'],
  addons: ['@storybook/addon-docs'],
}

export default config
