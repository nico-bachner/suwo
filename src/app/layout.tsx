import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'

import { Navbar } from '@/features/navigation/navbar'
import { LayoutFileProps } from '@/types'
import { cn } from '@/utils/cn'
import { QueryProvider } from '@/utils/query_provider'

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

export default function Layout({ children }: LayoutFileProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-neutral-7 text-neutral-2 font-sans antialiased scheme-dark',
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 px-4 py-8">{children}</div>
          </div>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
