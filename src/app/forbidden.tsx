import Link from 'next/link'

import { Button } from '@/design_system/button'
import { PageContainer } from '@/design_system/container'
import { routes } from '@/routes'

export default function Forbidden() {
  return (
    <PageContainer size="sm" className="prose">
      <h1>Forbidden</h1>

      <p>You do not have permission to access this page.</p>

      <Button variant="primary" asChild>
        <Link href={routes.HOME()}>Go back home</Link>
      </Button>
    </PageContainer>
  )
}
