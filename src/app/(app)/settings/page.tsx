import { PageContainer } from '@/design_system/container'
import { SettingsSection } from '@/design_system/settings_section'
import { LogOutButton } from '@/features/auth/log_out_button'
import { UpdatePasswordForm } from '@/features/auth/update_password_form'
import { UpdateMailingListPreferenceForm } from '@/features/mailing_list/update_mailing_list_preference_form'

export default function Page() {
  return (
    <PageContainer size="sm" className="prose">
      <h1>Settings</h1>

      <div className="flex flex-col gap-8">
        <SettingsSection
          title="Mailing List Preference"
          description="We send weekly emails to all SUWO members to keep you up to date with event scheduling and administrative issues. You can use the form below to set your communications preferences."
        >
          <UpdateMailingListPreferenceForm />
        </SettingsSection>

        <SettingsSection
          title="Password"
          description="If you need to reset your password, you can do so here. We recommend using a password manager to generate a secure password and keep track of it."
        >
          <UpdatePasswordForm />
        </SettingsSection>

        <LogOutButton />
      </div>
    </PageContainer>
  )
}
