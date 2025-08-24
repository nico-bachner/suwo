import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/design_system/accordion'
import { Section } from '@/design_system/section'

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Gillespie+Hall+-+St+Andrew's+College+CG5G/@-33.8899403,151.1850839,20z/data=!3m1!5s0x6b12b02ce82abfc7:0x250933fbe0fcf6b2!4m6!3m5!1s0x6b12b1af5537cc19:0x2dcf6e63ca183361!8m2!3d-33.8898771!4d151.1854906!16s%2Fg%2F11gy07j87q"
const SUWO_MYTHS_AND_LEGENDS_URL =
  'https://www.youtube.com/watch?v=tV0wRy84odo&list=PLAFBGwTsPuUE7Zv4iVroEbBGGGpjzRU6W'
const SUWO_BY_THE_SEA_URL =
  'https://www.youtube.com/watch?v=5lhicfFvAJc&list=PLAFBGwTsPuUEbb-nMoywriv12C_nO7uK3'
const PRESIDENT_EMAIL = 'mailto:president@suwo.org.au'

export const FAQsSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-sm">
    <h2>FAQs</h2>

    <Accordion type="multiple">
      <AccordionItem value="q_1">
        <AccordionTrigger>Where are rehearsals held?</AccordionTrigger>
        <AccordionContent>
          Rehearsals are held at Gillespie Hall, St Andrew&apos;s College, on
          the University of Sydney campus. You can find it on{' '}
          <Link
            href={GOOGLE_MAPS_URL}
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
          No, we do not hold auditions. We welcome players of all skill levels
          and experience.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="q_3">
        <AccordionTrigger>What instruments do you accept?</AccordionTrigger>
        <AccordionContent>
          We accept all wind, brass, and percussion instruments. If you play an
          instrument not typically found in a wind orchestra, feel free to swing
          by anyway and we&apos;ll see if we can fit you in!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="q_4">
        <AccordionTrigger>
          What if I can&apos;t attend a rehearsal?
        </AccordionTrigger>
        <AccordionContent>
          If you can&apos;t attend a rehearsal, that&apos;s absolutely fine. In
          fact, even if you&apos;re the type to dip mid-way through the semester
          and only show up for the concert, that&apos;s also fine! But you will
          be missed.
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
        <AccordionTrigger>Do I need to be a student to join?</AccordionTrigger>
        <AccordionContent>
          While this is a student club, you do not <em>need</em> to be a student
          to join. We also welcome students from other universities.
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
            href={SUWO_MYTHS_AND_LEGENDS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Myths & Legends
          </a>{' '}
          and{' '}
          <a
            href={SUWO_BY_THE_SEA_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            SUWO by the Sea
          </a>
          ) for a rough idea of the music we play. Note that we also regularly
          play student compositions.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="q_8">
        <AccordionTrigger>Who is the President?</AccordionTrigger>
        <AccordionContent>
          The President of SUWO is currently me, <strong>Ambrose</strong>. You
          may know me as the guy holding the <em>no auditions</em> sign. Please
          recommend me a new breakfast cereal at{' '}
          <a
            href={PRESIDENT_EMAIL}
            className="text-primary-2 outline-none hover:underline focus:underline"
          >
            president@suwo.org.au
          </a>
          .
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Section>
)
