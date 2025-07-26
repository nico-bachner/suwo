import Link from 'next/link'

import { Button } from '@/design_system/button'
import { Container, PageContainer } from '@/design_system/container'
import { NoAuditions } from '@/features/marketing/no_auditions'
import { routes } from '@/routes'

export default function Page() {
  return (
    <PageContainer size="lg">
      <Container size="sm" className="prose">
        <h1>Sydney University Wind Orchestra</h1>

        <p>
          The Sydney University Wind Orchestra (SUWO) is a student-run ensemble
          affiliated with the University of Sydney. We have{' '}
          <strong>no auditions</strong> and welcome anyone who is interested in
          playing wind, brass, or percussion instruments.
        </p>

        <h2>Rehearsals</h2>

        <NoAuditions />

        <p>
          We rehearse every{' '}
          <strong>Thursday evening at 17:00 at Gillespie Hall</strong> (see{' '}
          <Link
            href={routes.CALENDAR()}
            className="text-primary-2 hover:underline focus:underline focus:outline-none"
          >
            our calendar
          </Link>
          ) during the university semester, and perform once at the end of each
          semester.
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.9913322359207!2d151.18291567655325!3d-33.88987707321865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b1af5537cc19%3A0x2dcf6e63ca183361!2sGillespie%20Hall%20-%20St%20Andrew&#39;s%20College%20CG5G!5e0!3m2!1sen!2sdk!4v1753477585951!5m2!1sen!2sdk"
          className="aspect-video w-full focus:outline-none"
        ></iframe>

        <h2>Become a member</h2>

        <p>
          In advance of the first rehearsal, please join our club through the{' '}
          <em>University of Sydney Union (USU)</em>{' '}
        </p>

        <Button asChild variant="primary">
          <a
            href="https://usu.edu.au/clubs/wind-orchestra/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join via USU
          </a>
        </Button>

        <h2>
          An excerpt from <em>Myths and Legends</em>, SUWO&apos;s 2025 Semester
          1 concert
        </h2>
      </Container>

      <iframe
        src="https://www.youtube.com/embed/AerrE5gpIQo"
        className="aspect-video w-full focus:outline-none"
      ></iframe>
    </PageContainer>
  )
}
