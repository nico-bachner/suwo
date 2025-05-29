import { PageLayout } from '@/components/server/page_layout'
import { GOOGLE_CALENDAR_ID } from '@/config'

export default function Page() {
  return (
    <PageLayout title="The University of Sydney Wind Orchestra">
      <iframe
        src={`https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Australia%2FSydney&hl=en_GB&mode=AGENDA&src=${GOOGLE_CALENDAR_ID}&color=%23D81B60`}
        className="h-full min-h-96 w-full rounded-lg"
      />
    </PageLayout>
  )
}
