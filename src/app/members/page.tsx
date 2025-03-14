import Link from 'next/link'

import { NavigationBar } from '@/components/ui/navigation_bar'
import { getMembers } from '@/lib/db/members/get'

export default async function Page() {
  const members = await getMembers()

  return (
    <main className="prose flex flex-col gap-8">
      <NavigationBar
        title="Members"
        className="mx-auto w-full max-w-screen-sm"
      />

      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
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
    </main>
  )
}
