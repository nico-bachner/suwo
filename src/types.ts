import { ReactNode } from 'react'

export type LayoutProps = Readonly<{
  children: ReactNode
}>

export type PageProps = {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string>>
}

export type GenerateStaticParams<T> = () => Promise<T[]>
