import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/cn'

import '../globals.css'

const fontSans = Inter({
  variable: '--font-sans',
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
    <body className={cn('bg-gray-950 antialiased', fontSans.variable)}>
      {children}
    </body>
  </html>
)

export default Layout
