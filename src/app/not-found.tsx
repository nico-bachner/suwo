import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/ui/page_layout'

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
