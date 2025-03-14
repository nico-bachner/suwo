import Link from 'next/link'

import { PageLayout } from '@/components/ui/page_layout'
import { getMembers } from '@/lib/db/members/get'

export default async function Page() {
  const members = await getMembers()

  return (
    <PageLayout title="Members" className="mx-auto w-full max-w-screen-sm">
      <div className="grid grid-cols-2 gap-2">
        {members.map(({ id, given_name, family_name, instrument }) => (
          <Link
            key={id}
            href={`/members/${id}`}
            className="flex flex-col rounded-lg bg-gray-900 px-4 py-2 font-bold"
          >
            <span className="text-gray-300">
              {given_name} {family_name}
            </span>

            <span className="text-gray-500">{instrument}</span>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
