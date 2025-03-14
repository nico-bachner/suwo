import Link from 'next/link'

import { PageLayout } from '@/components/ui/page_layout'

import { LoginForm } from './login_form'

export default async function Page() {
  return (
    <PageLayout title="Log In" className="flex flex-col gap-4">
      <LoginForm />

      <p className="text-right text-sm text-gray-300">
        {"Don't have an account? "}
        <Link href="/join" className="font-bold text-blue-500 hover:underline">
          Sign up instead
        </Link>
      </p>
    </PageLayout>
  )
}
