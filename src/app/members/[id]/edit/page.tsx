import { notFound, redirect } from 'next/navigation'

import { PageLayout } from '@/components/ui/page_layout'
import { getSession } from '@/lib/auth/session'
import { getInstruments } from '@/lib/db/instruments/get'
import { getMemberByID } from '@/lib/db/member/get'
import { Member } from '@/lib/db/types'
import { Params } from '@/lib/types'

import { EditInstrumentForm } from './edit_instrument_form'
import { EditPasswordForm } from './edit_password_form'

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
    redirect(`/login`)
  }

  if (session.id !== id) {
    redirect(`/members/${id}`)
  }

  const { instrument } = await getMemberByID(id)
  const instruments = await getInstruments()

  return (
    <PageLayout
      parent={{
        title: `Back to Profile`,
        href: `/members/${id}`,
      }}
      title="Edit Profile"
      className="prose"
    >
      <h2>Password</h2>
      <EditPasswordForm />

      <h2>Instrument</h2>
      <EditInstrumentForm instrument={instrument} instruments={instruments} />
    </PageLayout>
  )
}
