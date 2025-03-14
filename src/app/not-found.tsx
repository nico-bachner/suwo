import Link from 'next/link'

import { PageLayout } from '@/components/ui/page_layout'

export default function Page() {
  return (
    <PageLayout title="404" subtitle="Page not found" className="prose">
      <p>{"The page you're looking for doesn't exist."}</p>
      <p>
        <Link href="/">Go back home</Link>
      </p>
    </PageLayout>
  )
}
