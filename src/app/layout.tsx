import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'

import { cn } from '@/cn'
import { Footer } from '@/components/ui/footer'
import { Navbar } from '@/components/ui/navbar'

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

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-gray-950 font-sans text-gray-100 antialiased scheme-dark',
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <div className="flex min-h-svh flex-col gap-8 sm:gap-12">
          <Navbar className="sticky top-0 px-6" />

          <div className="flex-1 px-6">{children}</div>

          <div className="px-6">
            <Footer />
          </div>
        </div>

        <Analytics />
      </body>
    </html>
  )
}
