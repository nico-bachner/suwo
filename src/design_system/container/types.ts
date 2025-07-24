import { ReactNode } from 'react'

export type ContainerProps = {
  children: ReactNode
  size: 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
  className?: string
}
