import { SettingsSection } from '@/design_system/settings_section'
import { UpdatePasswordForm } from '@/features/auth/update_password_form'
import { prisma } from '@/lib/prisma'

import { LogOutButton } from '../auth/log_out_button'
import { getSession } from '../auth/session/server/get_session'
import { UpdateMailingListPreferenceForm } from '../mailing_list/update_mailing_list_preference_form'

export const SettingsScreen = async () => {
  const session = await getSession()

  if (!session) {
    return null
  }

  const mailingListRecipient = await prisma.mailingListRecipient.findUnique({
    where: {
      user_id: session.user_id,
    },
  })

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Settings</h1>

      <div className="flex flex-col gap-8">
        <SettingsSection
          title="Mailing List Preference"
          description="We send weekly emails to all SUWO members to keep you up to date with event scheduling and administrative issues. You can use the form below to set your communications preferences."
        >
          <UpdateMailingListPreferenceForm
            mailingListPreference={Boolean(mailingListRecipient)}
          />
        </SettingsSection>

        <SettingsSection
          title="Password"
          description="If you need to reset your password, you can do so here. We recommend using a password manager to generate a secure password and keep track of it."
        >
          <UpdatePasswordForm />
        </SettingsSection>

        <LogOutButton />
      </div>
    </div>
  )
}
