import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageLayout } from '@/components/ui/page_layout'
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
    <PageLayout
      parent={{
        title: `Back to Members`,
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
    >
      <p>{instrument}</p>
      <p>{email}</p>
      <p>{usu}</p>
    </PageLayout>
  )
}
