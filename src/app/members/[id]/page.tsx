import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { NavigationBar } from '@/components/ui/navigation_bar'
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
    <main className="prose mx-auto flex w-full max-w-screen-sm flex-col gap-8">
      <NavigationBar
        parent={{
          href: `/members`,
        }}
        title={`${given_name} ${family_name}`}
        action={
          session.isAuth &&
          session.id === id && (
            <Link
              className="flex flex-row items-center"
              href={`/members/${id}/edit`}
            >
              <PencilSquareIcon className="h-6 w-6 stroke-gray-300" />
            </Link>
          )
        }
      />

      <div className="prose">
        <p>{instrument}</p>
        <p>{email}</p>
        <p>{usu}</p>
      </div>
    </main>
  )
}
