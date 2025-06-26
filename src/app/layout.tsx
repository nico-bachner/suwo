import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'

import { LayoutProps } from '@/types'
import { cn } from '@/utils/cn'

import '../styles/globals.css'

const fontSans = Raleway({
  variable: '--font-sans',
  subsets: ['latin'],
})

const fontSerif = Limelight({
  weight: '400',
  variable: '--font-serif',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SUWO',
  description: 'The Sydney University Wind Orchestra',
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-neutral-7 text-neutral-2 font-sans antialiased scheme-dark',
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        {children}

        <Analytics />
      </body>
    </html>
  )
}
