import Link from 'next/link'

import { Button } from '@/design_system/button'
import { routes } from '@/routes'

export default function Forbidden() {
  return (
    <main className="prose">
      <h1>Forbidden</h1>

      <p>You do not have permission to access this page.</p>

      <Button variant="primary" asChild>
        <Link href={routes.HOME()}>Go back home</Link>
      </Button>
    </main>
  )
}
