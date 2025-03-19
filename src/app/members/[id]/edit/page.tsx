import { notFound, redirect } from 'next/navigation'

import { PageLayout } from '@/components/ui/page_layout'
import { LINKS } from '@/config'
import { getSession } from '@/lib/auth/session'
import { getInstruments } from '@/lib/db/instruments/get'
import { getMember } from '@/lib/db/member/get_member'
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

  const { id } = await getSession()

  if (!id) {
    redirect(LINKS.LOG_IN.href)
  }

  if (id != parseInt(decodeURIComponent(idParam))) {
    redirect(`/members/${id}`)
  }

  const { given_name, family_name, instrument } = await getMember()
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
