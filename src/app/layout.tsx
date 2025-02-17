import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'

import { cn } from '@/cn'
import { Navbar } from '@/components/navbar'

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

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

const Layout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body
      className={cn(
        'bg-gray-950 font-sans text-gray-100 antialiased',
        fontSans.variable,
        fontSerif.variable,
      )}
    >
      <div className="flex min-h-svh flex-col gap-8 px-6 pb-20 sm:gap-12">
        <Navbar className="sticky top-0" />

        {children}
      </div>

      <Analytics />
    </body>
  </html>
)

export default Layout
