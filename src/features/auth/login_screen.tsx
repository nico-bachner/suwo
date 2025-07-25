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
        <div className="flex flex-col gap-4">
          <Button asChild variant="primary">
            <Link href={routes.LOGIN({ method: 'MAGIC_LINK' })}>
              Log in with Magic Link
            </Link>
          </Button>
          <Button variant="secondary">
            <Link href={routes.LOGIN({ method: 'PASSWORD' })}>
              Log in with Password
            </Link>
          </Button>
        </div>
      )
  }
}
