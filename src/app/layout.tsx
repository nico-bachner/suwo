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
          <div className="fixed inset-0 -z-10">
            <Image
              src={ensemble}
              alt="Sydney University Wind Orchestra"
              className="h-full w-full object-cover brightness-[0.2]"
            />
          </div>

          <div className="flex min-h-screen flex-col">
            <Navbar className="px-4 py-4" />

            <div className="flex-1 px-4 pt-12 pb-24">{children}</div>

            <Footer className="px-4" />
          </div>
        </QueryProvider>

        <Analytics />
      </body>
    </html>
  )
}
