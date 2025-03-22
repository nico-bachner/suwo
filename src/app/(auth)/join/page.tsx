import Link from 'next/link'

import { CreateMember } from '@/components/forms/create_member'
import { PageLayout } from '@/components/server/page_layout'

export default async function Page() {
  return (
    <PageLayout title="Join" className="flex flex-col gap-4">
      <CreateMember />

      <p className="text-right text-sm text-gray-300">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-blue-500 hover:underline">
          Log in instead
        </Link>
      </p>
    </PageLayout>
  )
}
