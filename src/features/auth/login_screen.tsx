import Link from 'next/link'

import { Button } from '@/design_system/button'
import { LoginWithMagicLinkForm } from '@/lib/forms/login_with_magic_link_form'
import { LoginWithPasswordForm } from '@/lib/forms/login_with_password_form'

import { LoginScreenSearchParams } from './login_screen_search_params_validator'
import { routes } from './routes'

export const LoginScreen = ({ method }: LoginScreenSearchParams) => {
  switch (method) {
    case 'MAGIC_LINK':
      return <LoginWithMagicLinkForm />
    case 'PASSWORD':
      return <LoginWithPasswordForm />
    default:
      return (
        <div className="flex max-w-screen-sm flex-col gap-4 sm:flex-row">
          <Button asChild variant="primary" className="flex-1">
            <Link href={routes.LOGIN({ method: 'MAGIC_LINK' })}>
              Log in with Magic Link
            </Link>
          </Button>
          <Button variant="secondary" className="flex-1">
            <Link href={routes.LOGIN({ method: 'PASSWORD' })}>
              Log in with Password
            </Link>
          </Button>
        </div>
      )
  }
}
