import Link from 'next/link'

import { PageContainer } from '@/design_system/container'
import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { RegisterForm } from '@/lib/forms/register_form'
import { routes } from '@/routes'

export default function Page() {
  return (
    <PageContainer size="sm" className="prose">
      <h1>Register</h1>

      <RegisterForm />

      <p className="text-right">
        Already have an account? <Link href={routes.LOGIN()}>Log in</Link>{' '}
        instead
      </p>

      <h2>Don&apos;t see your instrument in the list? Add it below.</h2>

      <CreateInstrumentForm />
    </PageContainer>
  )
}
