import type { Preview } from '@storybook/nextjs'

import '@/styles/globals.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      // Matches the config in src/app/layout.tsx
      <div className="bg-neutral-5 text-neutral-2 p-12 font-sans antialiased scheme-dark">
        <Story />
      </div>
    ),
  ],
}

export default preview
