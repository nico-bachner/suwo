'use client'

import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import { queries } from '@/lib/queries'
import { routes } from '@/routes'

export default function Layout({ children }: LayoutProps<'/auth'>) {
  const { data: session } = useQuery(queries.CURRENT_SESSION())

  if (session) {
    redirect(routes.SETTINGS())
  }

  return children
}
