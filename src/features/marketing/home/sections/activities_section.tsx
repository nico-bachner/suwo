import Link from 'next/link'

import { GOOGLE_MAPS_EMBED_URL } from '@/config'
import { Section } from '@/design_system/section'
import { routes } from '@/lib/routes'

export const ActivitiesSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-lg">
    <h2>Activities</h2>

    <p>
      We rehearse every{' '}
      <strong>
        Friday evening from 17:00 to 20:00 at the Holme Building Reading Room
      </strong>{' '}
      (see{' '}
      <Link
        href={routes.CALENDAR()}
        className="text-primary-2 outline-none hover:underline focus:underline"
      >
        our calendar
      </Link>
      ) during the university semester, and perform twice a year at the Sydney
      Conservatorium of Music&apos;s Verbrugghen Hall.
    </p>

    <iframe
      src={GOOGLE_MAPS_EMBED_URL}
      title="SUWO Rehearsal Location"
      loading="lazy"
      className="aspect-video w-full rounded-lg hue-rotate-180 invert-100 saturate-50 outline-none"
    />
  </Section>
)
