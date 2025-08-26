import Link from 'next/link'

import { Button } from '@/design_system/button'
import { Heading } from '@/design_system/typography'
import { LoginMethodValidator } from '@/features/auth/login_method_validator'
import { LoginScreen } from '@/features/auth/login_screen'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

export default async function Page({ searchParams }: PageProps<'/auth/login'>) {
  const { method } = await searchParams

  return (
    <main
      className={cn(
        'mx-auto w-full max-w-screen-lg',
        'grid grid-flow-dense grid-cols-1 gap-8 sm:grid-cols-2',
      )}
    >
      <div className="flex flex-col gap-8 self-start">
        {method && (
          <Button asChild variant="secondary" className="self-start">
            <Link href={routes.LOGIN()}>← Back to Login Options</Link>
          </Button>
        )}

        <Heading as="h1" variant="primary">
          Log In
        </Heading>
      </div>

      <LoginScreen
        method={LoginMethodValidator.parse(method)}
        className="row-span-2 self-center"
      />

      <p className="self-end">
        Don&apos;t have an account?{' '}
        <Link
          href={routes.REGISTER()}
          className="text-primary-2 outline-none hover:underline focus:underline"
        >
          Register
        </Link>{' '}
        instead
      </p>
    </main>
  )
}
