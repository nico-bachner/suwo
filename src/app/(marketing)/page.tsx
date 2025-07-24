import Link from 'next/link'

import { PageContainer } from '@/design_system/container'
import { routes } from '@/routes'

export default function Page() {
  return (
    <PageContainer size="sm" className="prose">
      <h1>Sydney University Wind Orchestra</h1>
      <p>
        Sydney University Wind Orchestra (SUWO) is a multi-award-winning concert
        band, performing a variety of repertoire throughout the year in
        concerts, competitions and tours. Rehearsals are held weekly during
        semester at 5:30pm on Thursdays at Old Darlington School. New players
        are warmly welcomed, and no auditions are required!
      </p>
      <p>
        <Link href={routes.REGISTER()}>Join us</Link> to become part of Sydney
        University’s “BEST SMALL CLUB” 2006, 2007, 2008, 2009 and 2010 – and
        NSW’s “Champion Open B Grade Concert Band” 2011!
      </p>
      <h2>Musical Opportunities</h2>
      <p>
        Musical Opportunities SUWO offers various performance opportunities and
        social events for its members throughout the year. We have a major
        concert at the end of each semester, as well as smaller concerts held
        throughout the year including our Showcase concert and our annual
        ‘Concert for Kids!’ programme.
      </p>
      <p>
        SUWO also performs in various competitions, notably the NSW State
        Championships, and holds an annual band camp and regional tour during
        the semester holidays (July and November). So far SUWO has seen the
        sights and performed for local primary schools in Nowra (2009 & 2011)
        the Hunter Valley (2010), and Canberra (2012).
      </p>
      <h2>Social Opportunities</h2>
      <p>
        SUWO has regular social events and activities open to everyone,
        including regular post-rehearsal dinners in Newtown/Glebe, trivia night,
        SUWO’s Amazing Race, and our annual Christmas party. There are always
        more activities planned outside of the “official” SUWO events; weekend
        drinks, Carols/Symphony/Opera in the Domain, and many more! Sign up to
        our Newsletter or subscribe to our RSS feed to stay up-to-date with all
        our events.
      </p>
      <p>
        SUWO is supported by the{' '}
        <a href="https://usu.edu.au" target="_blank" rel="noopener noreferrer">
          University of Sydney Union
        </a>{' '}
        Clubs and Societies program.
      </p>
    </PageContainer>
  )
}
