import { PageLayout } from '@/components/ui/page_layout'

import { ResetPasswordForm } from './reset_password_form'

export default async function Page() {
  return (
    <PageLayout title="Log In" className="flex flex-col gap-4">
      <ResetPasswordForm />
    </PageLayout>
  )
}
