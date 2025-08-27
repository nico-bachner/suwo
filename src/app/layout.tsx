import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Kode_Mono, Limelight, Raleway } from 'next/font/google'
import { Toaster } from 'sonner'

import { Footer } from '@/features/navigation/footer'
import { Navbar } from '@/features/navigation/navbar'
import { TabBar } from '@/features/navigation/tab_bar'
import { fetchEvents } from '@/lib/data/fetch_events'
import { fetchInstruments } from '@/lib/data/fetch_instruments'
import { fetchUsers } from '@/lib/data/fetch_users'
import { queryKeys } from '@/lib/queries'
import '@/styles/styles.css'
import { cn } from '@/utils/cn'
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

export default async function Layout({ children }: LayoutProps<'/'>) {
  const queryClient = new QueryClient()

  /**
   * Statically prefetch queries that are commonly used across the app to
   * improve performance and avoid loading states.
   */
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.USERS(),
      queryFn: fetchUsers,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.EVENTS(),
      queryFn: fetchEvents,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.INSTRUMENTS(),
      queryFn: fetchInstruments,
    }),
  ])

  return (
    <html lang="en">
      <body
        className={cn(fontSans.variable, fontSerif.variable, fontMono.variable)}
      >
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex min-h-screen flex-col">
              <TabBar className="fixed right-2 bottom-2 left-2 z-30 md:hidden" />

              <Navbar className="fixed top-2 right-2 left-2 z-30" />

              <div className="flex-1 px-4 py-32 md:py-40">{children}</div>

              <Footer className="px-4" />
            </div>
          </HydrationBoundary>
        </QueryProvider>

        <Toaster />

        <Analytics />
      </body>
    </html>
  )
}
