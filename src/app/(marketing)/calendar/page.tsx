import { Button } from '@/design_system/button'
import { Container, PageContainer } from '@/design_system/container'
import { Heading } from '@/design_system/typography'

export default function Page() {
  return (
    <PageContainer size="lg" className="flex flex-col gap-8">
      <Container asChild size="sm">
        <Heading as="h1" variant="primary">
          Calendar
        </Heading>
      </Container>

      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Australia%2FSydney&hl=en_GB&mode=AGENDA&src=ZDM0ODM2MmRmMGQ4MWIxOTAxYjQxYTMxMWRlMmJiZWFmZmM4ZmJhOGFhMjdiN2MxMDEzMjgxZGIyNzZkY2NkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23D81B60"
        className="aspect-video w-full rounded-lg"
      />

      <Container asChild size="md">
        <Button asChild variant="primary">
          <a
            href="https://calendar.google.com/calendar/u/0?cid=ZDM0ODM2MmRmMGQ4MWIxOTAxYjQxYTMxMWRlMmJiZWFmZmM4ZmJhOGFhMjdiN2MxMDEzMjgxZGIyNzZkY2NkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe to the SUWO calendar
          </a>
        </Button>
      </Container>
    </PageContainer>
  )
}
