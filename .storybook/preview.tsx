import type { Preview } from '@storybook/nextjs-vite'

import '@/styles/styles.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      // Matches the config in src/app/layout.tsx
      <div className="body p-12">
        <Story />
      </div>
    ),
  ],
}

export default preview
