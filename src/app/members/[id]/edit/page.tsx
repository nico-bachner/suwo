import { notFound, redirect } from 'next/navigation'

import { PageLayout } from '@/components/ui/page_layout'
import { LINKS } from '@/config'
import { getSession } from '@/lib/auth/session'
import { getInstruments } from '@/lib/db/instruments/get'
import { getMemberByID } from '@/lib/db/member/get_member_by_id'
import { Member } from '@/lib/db/types'
import { Params } from '@/lib/types'

import { EditInstrumentForm } from './edit_instrument_form'

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

  if (!session.isAuth) {
    redirect(LINKS.LOG_IN.href)
  }

  if (session.id !== id) {
    redirect(`/members/${id}`)
  }

  const { given_name, family_name, instrument } = await getMemberByID(id)
  const instruments = await getInstruments()

  return (
    <PageLayout
      parent={{
        title: `View Profile`,
        href: `/members/${id}`,
      }}
      title={`${given_name} ${family_name}`}
      subtitle={instrument ?? undefined}
      className="prose"
    >
      <h2>Instrument</h2>
      <EditInstrumentForm instrument={instrument} instruments={instruments} />
    </PageLayout>
  )
}
