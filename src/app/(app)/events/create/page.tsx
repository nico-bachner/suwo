'use client'

import { Heading } from '@/design_system/typography'
import { CreateEventForm } from '@/lib/forms/create_event_form'

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-screen-sm flex-col gap-8">
      <Heading as="h1" variant="primary">
        Create Event
      </Heading>

      <CreateEventForm />
    </main>
  )
}
