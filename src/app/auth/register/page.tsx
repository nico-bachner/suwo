import Link from 'next/link'

import { Heading } from '@/design_system/typography'
import { CreateInstrumentForm } from '@/lib/forms/create_instrument_form'
import { RegisterForm } from '@/lib/forms/register_form'
import { routes } from '@/lib/routes'

export default function Page() {
  return (
    <main className="flex flex-col gap-48">
      <section className="mx-auto flex w-full max-w-screen-lg flex-col gap-12">
        <Heading
          variant="primary"
          as="h1"
          className="mx-auto w-full max-w-screen-sm"
        >
          Register
        </Heading>

        <RegisterForm />

        <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-4">
          <p className="text-left">
            Already have an account?{' '}
            <Link
              href={routes.LOGIN()}
              className="text-primary-2 hover:underline;"
            >
              Log in
            </Link>{' '}
            instead
          </p>

          <p className="text-right">
            Don&apos;t see your instrument in the list? Add it below.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-screen-sm flex-col gap-12">
        <Heading variant="secondary" as="h2" className="text-center">
          Add Instrument
        </Heading>

        <CreateInstrumentForm />
      </section>
    </main>
  )
}
