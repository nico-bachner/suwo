import { INSTAGRAM_URL } from '@/config'
import { Section } from '@/design_system/section'

export const RehearsalsSection = () => (
  <Section className="prose mx-auto w-full max-w-screen-lg">
    <h2>Rehearsals - Semester 1 2026</h2>
    <p>
      Week 1 - Friday 27 February 17:00-20:00 <br/>
      Holme Building Reading Room
    </p>

    <p>
      Week 2 - Thursday 5 March 17:00-20:00 <br/>
      Sydney Park Pavillion
    </p>

    <p>
      <strong> SUBJECT TO CHANGE - Check our <a href={INSTAGRAM_URL}>Instagram</a> for updates </strong> <br/>
      Week 3+ - Fridays 17:00-20:00 <br/>
      Holme Building Reading Room
    </p>

    <p>
      <br/>
      We have 2 concerts every year at Verbruggen Hall in the Sydney
      Conservatorium of Music. We would love to see you there!<br/>
      Concert updates will also be on Instagram.
    </p>
  </Section>
)
