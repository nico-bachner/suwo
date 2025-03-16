import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/ui/page_layout'
import { logOut } from '@/lib/auth/log_out'

import { EditPasswordForm } from './edit_password_form'

export default async function Page() {
  return (
    <PageLayout title="Settings" className="flex flex-col gap-8">
      <div className="prose flex-1">
        <h2>Update Password</h2>
        <EditPasswordForm />
      </div>

      <Button variant="secondary" onClick={logOut}>
        Log Out
      </Button>
    </PageLayout>
  )
}
