import Link from 'next/link'

import { Login } from '@/components/forms/login'
import { PageLayout } from '@/components/server/page_layout'

export default async function Page() {
  return (
    <PageLayout title="Log In" className="flex flex-col gap-4">
      <Login />

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
