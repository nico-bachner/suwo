import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'

import { Navbar } from '@/features/navigation/navbar'
import { getSession } from '@/lib/auth/session/get_session'
import { LayoutFileProps } from '@/types'
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

export default async function Layout({ children }: LayoutFileProps) {
  const session = await getSession()

  return (
    <html lang="en">
      <body
        className={cn(
          'bg-neutral-7 text-neutral-2 font-sans antialiased scheme-dark',
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar session={session} />
          <div className="flex-1 px-4 py-8">{children}</div>
        </div>

        <Analytics />
      </body>
    </html>
  )
}
