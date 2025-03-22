import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <PageLayout
      title="404"
      subtitle="Page not found"
      className="flex flex-col items-center justify-center gap-8"
    >
      <p className="text-center text-xl font-medium">
        {"The page you're looking for doesn't exist."}
      </p>

      <Button variant="primary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </PageLayout>
  )
}
