import { SettingsSection } from '@/design_system/settings_section'
import { LogOutButton } from '@/features/auth/log_out_button'
import { UpdateMailingListPreferenceForm } from '@/lib/forms/update_mailing_list_preference_form'
import { UpdatePasswordForm } from '@/lib/forms/update_password_form'

export default function Page() {
  return (
    <main className="prose">
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
    </main>
  )
}
