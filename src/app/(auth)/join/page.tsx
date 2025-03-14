import { PageLayout } from '@/components/ui/page_layout'
import { getInstruments } from '@/lib/db/instruments/get'

import { CreateMemberForm } from './create_member_form'

export default async function Page() {
  const instruments = await getInstruments()

  return (
    <PageLayout title="Join">
      <CreateMemberForm instruments={instruments} />
    </PageLayout>
  )
}
