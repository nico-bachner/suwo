import Link from 'next/link'

import { Section } from '@/design_system/section'
import { routes } from '@/routes'

const REHEARSAL_LOCATION_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.9913322359207!2d151.18291567655325!3d-33.88987707321865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b1af5537cc19%3A0x2dcf6e63ca183361!2sGillespie%20Hall%20-%20St%20Andrew&#39;s%20College%20CG5G!5e0!3m2!1sen!2sdk!4v1753477585951!5m2!1sen!2sdk'

export const RehearsalsSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-lg">
    <h2>Rehearsals</h2>

    <p>
      We rehearse every{' '}
      <strong>Thursday evening at 17:00 at Gillespie Hall</strong> (see{' '}
      <Link
        href={routes.CALENDAR()}
        className="text-primary-2 outline-none hover:underline focus:underline"
      >
        our calendar
      </Link>
      ) during the university semester, and perform once at the end of each
      semester.
    </p>

    <iframe
      src={REHEARSAL_LOCATION_EMBED_URL}
      title="SUWO Rehearsal Location"
      className="aspect-video w-full rounded-lg hue-rotate-180 invert-100 saturate-50 outline-none"
    />
  </Section>
)
