import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'

import { cn } from '@/cn'

import '../globals.css'

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
      {children}
    </body>
  </html>
)

export default Layout
