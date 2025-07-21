import type { MetadataRoute } from 'next'

import { routes } from '@/routes'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [routes.HOME(), routes.HISTORY()],
        disallow: ['/api/', routes.MEMBERS()],
      },
    ],
  }
}
