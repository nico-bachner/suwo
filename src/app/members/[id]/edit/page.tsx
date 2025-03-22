import { notFound, redirect } from 'next/navigation'

import { SelectInstrument } from '@/components/forms/select_instrument'
import { PageLayout } from '@/components/server/page_layout'
import { SettingsSection } from '@/components/ui/settings_section'
import { LINKS } from '@/config'
import { getSession } from '@/lib/auth/session'
import { getMember } from '@/lib/db/member/get_member'
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

  const { id } = await getSession()

  if (!id) {
    redirect(LINKS.LOG_IN.href)
  }

  if (id != parseInt(decodeURIComponent(idParam))) {
    redirect(`/members/${id}`)
  }

  const { given_name, family_name, instrument } = await getMember()

  return (
    <PageLayout
      parent={{
        title: `View Profile`,
        href: `/members/${id}`,
      }}
      title={`${given_name} ${family_name}`}
      subtitle={instrument ?? undefined}
      className="flex flex-col gap-12"
    >
      <SettingsSection
        title="Instrument"
        description="This is the instrument you usually play during SUWO rehearsals. If you play multiple instruments, choose the one you play most often."
      >
        <SelectInstrument />
      </SettingsSection>
    </PageLayout>
  )
}
