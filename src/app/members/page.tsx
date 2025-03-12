import Link from 'next/link'

import { getMembers } from '@/lib/db/queries/get_members'

export default async function Page() {
  const members = await getMembers()

  return (
    <main className="prose">
      <h1>Members</h1>

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
