import { Metadata, ResolvingMetadata } from 'next'
import { NextRequest } from 'next/server'

import {
  AppRouteHandlerRoutes,
  AppRoutes,
  LayoutRoutes,
} from '../../.next/types/routes'

/**
 * Next.js Error File Props
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#props
 */
export type ErrorProps = {
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
export type APIRoute<AppRouteHandlerRoute extends AppRouteHandlerRoutes> = (
  request: NextRequest,
  context: RouteContext<AppRouteHandlerRoute>,
) => Promise<Response>

/**
 * Next.js generateStaticParams Function Type
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params#parameters
 */
export type GenerateStaticParams<AppRoute extends AppRoutes> = () => Promise<
  Awaited<PageProps<AppRoute>['params']>[]
>

/**
 * Next.js generateMetadata Function Type
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export type GeneratePageMetadata<AppRoute extends AppRoutes> = (
  parameters: PageProps<AppRoute>,
  parent: ResolvingMetadata,
) => Promise<Metadata>
export type GenerateLayoutMetadata<LayoutRoute extends LayoutRoutes> = (
  parameters: LayoutProps<LayoutRoute>,
  parent: ResolvingMetadata,
) => Promise<Metadata>
