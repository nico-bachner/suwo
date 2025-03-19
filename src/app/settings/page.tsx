import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/ui/page_layout'
import { SettingsSection } from '@/components/ui/settings_section'
import { logOut } from '@/lib/auth/log_out'
import { getMember } from '@/lib/db/member/get_member'

import { CommunicationsForm } from './communications_form'
import { EditPasswordForm } from './edit_password_form'

export default async function Page() {
  const { mailing_list } = await getMember()

  return (
    <PageLayout title="Settings" className="flex flex-col gap-12">
      <SettingsSection
        title="Communications"
        description="Choose what communications you would like to receive from us. If you're not sure, we recommend keeping all options selected."
      >
        <CommunicationsForm mailing_list={mailing_list} />
      </SettingsSection>

      <SettingsSection
        title="Password"
        description="If you need to reset your password, you can do so here. We recommend using a password manager to generate a secure password and keep track of it."
      >
        <EditPasswordForm />
      </SettingsSection>

      <Button variant="secondary" onClick={logOut}>
        Log Out
      </Button>
    </PageLayout>
  )
}
