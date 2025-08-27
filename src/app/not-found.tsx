import Link from 'next/link'

import { Button } from '@/design_system/button'
import { routes } from '@/lib/routes'

export default function NotFound() {
  return (
    <main className="prose">
      <h1>404</h1>
      <p>Page not found</p>
      <p>{"The page you're looking for doesn't exist."}</p>
      <Button variant="primary" asChild>
        <Link href={routes.HOME()}>Go back home</Link>
      </Button>
    </main>
  )
}
