import Link from 'next/link'

import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { RegisterForm } from '@/lib/forms/register_form'
import { routes } from '@/routes'

export default function Page() {
  return (
    <main className="prose">
      <h1>Register</h1>

      <RegisterForm />

      <p>
        Already have an account? <Link href={routes.LOGIN()}>Log in</Link>{' '}
        instead
      </p>

      <h2>Don&apos;t see your instrument in the list? Add it below.</h2>

      <CreateInstrumentForm />
    </main>
  )
}
