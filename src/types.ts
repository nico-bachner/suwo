import { ReactNode } from 'react'

export type LayoutProps = Readonly<{
  children: ReactNode
}>

export type NextParams<T> = Promise<T>

export type GenerateStaticParams<T> = () => Promise<T[]>
