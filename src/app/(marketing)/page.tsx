import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design_system/accordion'
import { Button } from '@/design_system/button'
import { NoAuditions } from '@/features/marketing/no_auditions'
import { routes } from '@/routes'

export default function Page() {
  return (
    <>
      <NoAuditions />

      <main className="prose">
        <h1>Sydney University Wind Orchestra</h1>

        <p>
          The Sydney University Wind Orchestra (SUWO) is a student-run ensemble
          affiliated with the University of Sydney. We have{' '}
          <strong>no auditions</strong> and welcome anyone who is interested in
          playing wind, brass, or percussion instruments.
        </p>

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
          title="SUWO Rehearsal Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.9913322359207!2d151.18291567655325!3d-33.88987707321865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b1af5537cc19%3A0x2dcf6e63ca183361!2sGillespie%20Hall%20-%20St%20Andrew&#39;s%20College%20CG5G!5e0!3m2!1sen!2sdk!4v1753477585951!5m2!1sen!2sdk"
          className="aspect-video w-full rounded-lg hue-rotate-180 invert-100 saturate-50 outline-none"
        />

        <h2>Become a member</h2>

        <p>
          In advance of the first rehearsal, please join our club through the{' '}
          <em>University of Sydney Union (USU)</em>. Not sure if we match your
          vibe? Come anyway, the first few weeks of each semester are free to
          attend.
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

        <iframe
          title="SUWO Myths and Legends Concert – The Lord of the Rings"
          src="https://www.youtube.com/embed/AerrE5gpIQo"
          className="aspect-video w-full rounded-3xl brightness-75 outline-none"
        />

        <h2>FAQs</h2>

        <Accordion type="multiple">
          <AccordionItem value="q_1">
            <AccordionTrigger>Where are rehearsals held?</AccordionTrigger>
            <AccordionContent>
              Rehearsals are held at Gillespie Hall, St Andrew&apos;s College,
              on the University of Sydney campus. You can find it on{' '}
              <Link
                href="https://www.google.com/maps/place/Gillespie+Hall/@-33.8898771,151.1829157,17z/data=!3m1!4b1!4m6!3m5!1s0x6b12b1af5537cc19:0x2dcf6e63ca183361!8m2!3d-33.8898771!4d151.1829157!16s%2Fg%2F11c5_9j9qv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-2 outline-none hover:underline focus:underline"
              >
                Google Maps
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_2">
            <AccordionTrigger>Do I need to audition?</AccordionTrigger>
            <AccordionContent>
              No, we do not hold auditions. We welcome players of all skill
              levels and experience.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_3">
            <AccordionTrigger>What instruments do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all wind, brass, and percussion instruments. If you play
              an instrument not typically found in a wind orchestra, feel free
              to swing by anyway and we&apos;ll see if we can fit you in!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_4">
            <AccordionTrigger>
              What if I can&apos;t attend a rehearsal?
            </AccordionTrigger>
            <AccordionContent>
              If you can&apos;t attend a rehearsal, that&apos;s absolutely fine.
              In fact, even if you&apos;re the type to dip mid-way through the
              semester and only show up for the concert, that&apos;s also fine!
              But you will be missed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_5">
            <AccordionTrigger>Can I join mid-semester?</AccordionTrigger>
            <AccordionContent>
              Yes, you can join at any time during the semester. We welcome new
              members throughout the year.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_6">
            <AccordionTrigger>
              Do I need to be a student to join?
            </AccordionTrigger>
            <AccordionContent>
              While this is a student club, you do not <em>need</em> to be a
              student to join. We also welcome students from other universities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_7">
            <AccordionTrigger>What kind of music do you play?</AccordionTrigger>
            <AccordionContent>
              Check out our{' '}
              <a href="http://" target="_blank" rel="noopener noreferrer">
                YouTube Channel
              </a>{' '}
              (especially the last two performances,{' '}
              <a
                href="https://www.youtube.com/watch?v=tV0wRy84odo&list=PLAFBGwTsPuUE7Zv4iVroEbBGGGpjzRU6W"
                target="_blank"
                rel="noopener noreferrer"
              >
                Myths & Legends
              </a>{' '}
              and{' '}
              <a
                href="https://www.youtube.com/watch?v=5lhicfFvAJc&list=PLAFBGwTsPuUEbb-nMoywriv12C_nO7uK3"
                target="_blank"
                rel="noopener noreferrer"
              >
                SUWO by the Sea
              </a>
              ) for a rough idea of the music we play. Note that we also
              regularly play student compositions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q_8">
            <AccordionTrigger>Who is the President?</AccordionTrigger>
            <AccordionContent>
              The President of SUWO is currently me, <strong>Ambrose</strong>.
              You may know me as the guy holding the <em>no auditions</em> sign.
              Please recommend me a new breakfast cereal at{' '}
              <a
                href="mailto:president@suwo.org.au"
                className="text-primary-2 outline-none hover:underline focus:underline"
              >
                president@suwo.org.au
              </a>
              .
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  )
}
