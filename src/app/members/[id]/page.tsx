import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getMemberByID } from '@/lib/db/member/get'
import { getSession } from '@/lib/db/session'
import { Member } from '@/lib/db/types'
import { Params } from '@/lib/types'

type PageProps = {
  params: Params<Pick<Member, 'id'>>
}

export default async function Page({ params }: PageProps) {
  const { id: idParam } = await params

  if (!idParam) {
    notFound()
  }

  const id = parseInt(decodeURIComponent(idParam))

  const session = await getSession()
  const { given_name, family_name, email, usu, instrument } =
    await getMemberByID(id)

  return (
    <main className="prose">
      <h1 className="flex flex-row justify-between gap-4">
        <span>
          {given_name} {family_name}
        </span>

        {session.isAuth && session.id === id && (
          <Link
            className="flex flex-row items-center"
            href={`/members/${id}/edit`}
          >
            <PencilSquareIcon className="h-6 w-6 stroke-gray-500" />
          </Link>
        )}
      </h1>

      <p>{email}</p>
      <p>{usu}</p>

      <p>{instrument}</p>
    </main>
  )
}
