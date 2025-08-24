import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Kode_Mono, Limelight, Raleway } from 'next/font/google'
import { Toaster } from 'sonner'

import { Footer } from '@/features/navigation/footer'
import { Navbar } from '@/features/navigation/navbar'
import { TabBar } from '@/features/navigation/tab_bar'
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

const fontMono = Kode_Mono({
  variable: '--font-mono',
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
        className={cn(fontSans.variable, fontSerif.variable, fontMono.variable)}
      >
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <TabBar className="fixed right-2 bottom-2 left-2 z-30 md:hidden" />

            <Navbar className="fixed top-2 right-2 left-2 z-30" />

            <div className="flex-1 px-4 py-32 md:py-40">{children}</div>

            <Footer className="px-4" />
          </div>

          <Toaster />
        </QueryProvider>

        <Analytics />
      </body>
    </html>
  )
}
