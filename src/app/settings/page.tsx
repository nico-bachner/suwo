import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/ui/page_layout'
import { logOut } from '@/lib/auth/log_out'
import { getMember } from '@/lib/db/member/get_member'

import { CommunicationsForm } from './communications_form'
import { EditPasswordForm } from './edit_password_form'

export default async function Page() {
  const { mailing_list } = await getMember()

  return (
    <PageLayout title="Settings" className="flex flex-col gap-12">
      <section className="prose">
        <h2>Communications</h2>
        <p>Choose what communications you would like to receive from us.</p>
        <CommunicationsForm mailing_list={mailing_list} />
      </section>

      <section className="prose">
        <h2>Update Password</h2>
        <EditPasswordForm />
      </section>

      <Button variant="secondary" onClick={logOut}>
        Log Out
      </Button>
    </PageLayout>
  )
}
