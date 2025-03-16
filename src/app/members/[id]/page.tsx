import { PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageLayout } from '@/components/ui/page_layout'
import { getSession } from '@/lib/auth/session'
import { getMemberByID } from '@/lib/db/member/get_member_by_id'
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
        title: `All Members`,
        href: `/members`,
      }}
      title={`${given_name} ${family_name}`}
      subtitle={instrument ?? undefined}
      action={
        session.id == id && (
          <Link
            href={`/members/${id}/edit`}
            className="flex cursor-pointer flex-row items-center rounded-full bg-amber-900 px-4 py-2 transition-colors select-none hover:bg-amber-800 focus:bg-amber-900 focus:outline-none"
          >
            <PencilIcon className="h-5 w-5 stroke-gray-300" />

            <span className="px-2 font-medium text-gray-300">Edit</span>
          </Link>
        )
      }
    />
  )
}
