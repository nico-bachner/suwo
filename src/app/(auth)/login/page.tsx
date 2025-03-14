import { PageLayout } from '@/components/ui/page_layout'

import { LoginForm } from './login_form'

export default async function Page() {
  return (
    <PageLayout title="Log In">
      <LoginForm />
    </PageLayout>
  )
}
