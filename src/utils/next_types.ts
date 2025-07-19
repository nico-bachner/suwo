import { Metadata, ResolvedMetadata } from 'next'
import { NextRequest } from 'next/server'
import { ReactNode } from 'react'

/** Next.js NextParams Type */
export type NextParams<T extends Record<string, string>> = T

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
 * Next.js API Route Handler Parameters
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route#parameters
 */
export type APIRoute = (
  request: NextRequest,
  context: {
    params: Promise<Record<string, string>>
  },
) => Promise<Response>

/**
 * Next.js generateStaticParams Function Type
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export type GenerateStaticParams = () => Promise<Array<Record<string, string>>>

/**
 * Next.js generateMetadata Function Type
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export type GenerateMetadata = (
  parameters: {
    params: Promise<Record<string, string>>
    searchParams: Promise<Record<string, string>>
  },
  parent: Promise<ResolvedMetadata>,
) => Promise<Metadata>
