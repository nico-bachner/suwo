import { notFound } from 'next/navigation'

import { PageLayout } from '@/components/ui/page_layout'
import { getSession } from '@/lib/auth/session'
import { getMemberByID } from '@/lib/db/member/get'
import { Member } from '@/lib/db/types'
import { Params } from '@/lib/types'

import { ProfileAction } from './profile_action'

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
      subtitle={instrument ?? undefined}
      action={session.isAuth && session.id === id && <ProfileAction id={id} />}
    />
  )
}
