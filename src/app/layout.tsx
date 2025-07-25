import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'
import Image from 'next/image'

import ensemble from '@/features/marketing/ensemble.jpg'
import { Footer } from '@/features/navigation/footer'
import { Navbar } from '@/features/navigation/navbar'
import '@/styles/styles.css'
import { cn } from '@/utils/cn'
import { LayoutFileProps } from '@/utils/next_types'
import { QueryProvider } from '@/utils/query_provider'

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
      <body className={cn(fontSans.variable, fontSerif.variable)}>
        <QueryProvider>
          <Image
            src={ensemble}
            alt="Sydney University Wind Orchestra"
            className="fixed inset-0 -z-10 w-full brightness-[0.15]"
          />

          <div className="flex min-h-screen flex-col">
            <Navbar />

            {children}

            <Footer />
          </div>
        </QueryProvider>

        <Analytics />
      </body>
    </html>
  )
}
