import { ReactNode } from 'react'

/**
 * Next.js Layout File Props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout#props
 */
export type LayoutFileProps = Readonly<{
  children: ReactNode
}>

/**
 * Next.js Page File Props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 */
export type PageFileProps = {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string>>
}

/**
 * Next.js Error File Props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export type ErrorFileProps = {
  error: Error & {
    digest?: string
  }
  reset: () => void
}

/**
 * Next.js generateStaticParams Function Type
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export type GenerateStaticParams<T> = () => Promise<T[]>
