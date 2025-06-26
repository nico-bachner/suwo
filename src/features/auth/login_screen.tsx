import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { LINKS } from '@/config'
import { LoginForm } from '@/features/auth/login_form'
import { MagicLinkForm } from '@/features/auth/magic_link_form'

export const LoginScreen = () => (
  <PageLayout title="Log In" className="flex flex-col gap-4">
    <LoginForm />

    <p>OR</p>

    <MagicLinkForm />

    <p className="text-sm text-gray-300 lg:text-right">
      {"Don't have an account? "}
      <Link
        href={LINKS.REGISTER.href}
        className="font-bold text-blue-500 hover:underline"
      >
        Sign up instead
      </Link>
    </p>
  </PageLayout>
)
