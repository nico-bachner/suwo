import { PageLayout } from '@/components/server/page_layout'

import { MagicLinkForm } from './magic_link_form'

export const MagicLinkScreen = () => (
  <PageLayout title="Log in" className="flex flex-col gap-4">
    <MagicLinkForm />
  </PageLayout>
)
