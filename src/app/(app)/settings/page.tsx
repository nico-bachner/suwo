import { SetCommunicationsPreferences } from '@/components/forms/set_communications_preferences'
import { PageLayout } from '@/components/server/page_layout'
import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { UpdatePasswordForm } from '@/features/auth/update_password_form'
import { logOut } from '@/lib/auth/log_out'

export default function Page() {
  return (
    <PageLayout title="Settings" className="flex flex-col gap-12">
      <SettingsSection
        title="Communication Preferences"
        description="We send weekly emails to all SUWO members to keep you up to date with event scheduling and administrative issues. You can use the form below to set your communications preferences."
      >
        <SetCommunicationsPreferences />
      </SettingsSection>

      <SettingsSection
        title="Password"
        description="If you need to reset your password, you can do so here. We recommend using a password manager to generate a secure password and keep track of it."
      >
        <UpdatePasswordForm />
      </SettingsSection>

      <Button variant="danger" onClick={logOut}>
        Log Out
      </Button>
    </PageLayout>
  )
}
