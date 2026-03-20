import { ActivitiesSection } from '@/features/marketing/home/sections/activities_section'
import { ConcertExcerptSection } from '@/features/marketing/home/sections/concert_excerpt_section'
import { FAQsSection } from '@/features/marketing/home/sections/faqs_section'
import { JoinSection } from '@/features/marketing/home/sections/join_section'

export const HomePage = () => (
  <main className="flex flex-col gap-8">
    <section className="prose mx-auto w-full max-w-screen-sm">
      <h1>Sydney University Wind Orchestra</h1>

      <p>
        The Sydney University Wind Orchestra (SUWO) is a student-run ensemble
        affiliated with the University of Sydney. We hold{' '}
        <strong>no auditions</strong> and welcome anyone who is interested in
        playing wind, brass, or percussion instruments.
      </p>
    </section>

    <JoinSection />

    <ActivitiesSection />

    <ConcertExcerptSection />

    <FAQsSection />

    <JoinSection />
  </main>
)
