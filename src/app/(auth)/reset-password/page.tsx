import { ResetPasswordForm } from '@/components/forms/reset_password/form'
import { PageLayout } from '@/components/server/page_layout'

export default async function Page() {
  return (
    <PageLayout title="Log In" className="flex flex-col gap-4">
      <ResetPasswordForm />
    </PageLayout>
  )
}
