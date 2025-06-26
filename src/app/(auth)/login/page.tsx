import Link from 'next/link'

import { PageLayout } from '@/components/server/page_layout'
import { LoginForm } from '@/features/auth/login/login_form'

export default function Page() {
  return (
    <PageLayout title="Log In" className="flex flex-col gap-4">
      <LoginForm />

      <p className="text-sm text-gray-300 lg:text-right">
        <Link
          href="/reset-password"
          className="font-bold text-blue-500 hover:underline"
        >
          Forgot your password?
        </Link>
      </p>

      <p className="text-sm text-gray-300 lg:text-right">
        {"Don't have an account? "}
        <Link href="/join" className="font-bold text-blue-500 hover:underline">
          Sign up instead
        </Link>
      </p>
    </PageLayout>
  )
}
