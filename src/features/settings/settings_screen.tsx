import { Button } from '@/design_system/button'
import { SettingsSection } from '@/design_system/settings_section'
import { UpdatePasswordForm } from '@/features/auth/update_password_form'
import { logOut } from '@/lib/auth/log_out'
import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

import { UpdateMailingListPreferenceForm } from '../mailing_list/update_mailing_list_preference_form'

export const SettingsScreen = async () => {
  const { id } = await getSession()

  if (!id) {
    return null
  }

  const mailingListRecipient = await prisma.mailingListRecipient.findUnique({
    where: {
      user_id: id,
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

        <Button variant="danger" onClick={logOut}>
          Log Out
        </Button>
      </div>
    </div>
  )
}
