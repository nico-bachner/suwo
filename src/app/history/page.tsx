import { Year } from './year'

const Page = () => (
  <main className="flex flex-col items-center gap-8 px-6 py-8">
    <h1 className="font-serif text-6xl font-extrabold">{`SUWO's History`}</h1>

    <Year year={2013}>
      <p>
        2013 started with a bang for SUWO. The early months saw the band adapt a
        new logo and visual identity. Benjamin Tang’s logo is a vivid
        representation of Sydney University Wind Orchestra as a band. The
        stylised circles are highly symbolic while also achieving a vibrant,
        diverse, youthful and professional look. The concept of concentric
        circles demonstrates unity between instruments. Whether it be keys on
        winds, valves on brass or drums and cymbals in percussion. It equally
        represents all instruments, and this equality between members is a core
        value of SUWO.
      </p>
      <p>
        We had a chance to show off our new look with stylish new T-Shirts and
        banners at O-Week where we signed up a record breaking 64 members.
      </p>
      <p>
        More records were set with an incredible sustained attendance record at
        all rehearsals so far in 2013. Week one saw band members finish
        rehearsal early to enjoy a sausage sizzle meet & Greet.
      </p>
      <p>
        Continuing on from our successful Amazing Race in 2012 we decided to
        come back bigger and better in 2013. This year we invited members of two
        of USYD’s other musical powerhouses- The Sydney Unversity Symphony
        Orchestra and Sydney University Musical Society to participate in The
        Amazing Musicians’ Race. With the theme Musicians go to the zoo, race
        participants we put through a series of roadblocks and detours with
        animal themed tasks. It was a truly successful event and one which we
        plan on repeating before the year’s through.
      </p>
    </Year>

    <Year year={2012}>
      <p>
        2012 was another highly successful year for the band. More milestones
        were set with the first ever Orientation week “SUWO Amazing Race”
        Scavenger Hunt (won by the Clarinets and Oboes), a record average
        attendance of 50 across the year and a hugely successful Semester 1
        concert, Ride!. SUWO has also met its goal of purchasing important
        percussion instruments, including a gong, crash cymbals and orchestral
        bells.
      </p>
      <p>
        In August SUWO received 2nd Place honours at the 2012 NSW State Band
        Championships in the Open B Grade Concert division. We also raised over
        $500 at our annual Showcase pre-states fundraising concert.
      </p>
      <p>
        The band finished off the year with three major events. SUWO’s end of
        year concert, Folk and Legends at the Italian Forum culminated in a
        stunning performance of music from the Lord of the Rings film trilogy,
        featuring guest soloists on soprano voice and violin. It also featured
        the surprise proposal from SUWO’s Trumpet Section Leader, Stephen, to
        Kat our principal Alto Clarinet player. It should be noted that the
        proposal was 100% successful.
      </p>
      <p>
        In December, SUWO went Dancing- taking its music to primary school
        children in Campbelltown and inner Sydney. TheDancing With Suwo school
        concert series was a huge success, providing fun and interactive
        concerts to children who would not usually have the opportunity. The
        very next week SUWO travelled south to Canberra. The band thoroughly
        enjoyed the lively concert programme at Majura Public School and Black
        Mountain School every bit as much as the children and teachers. It was
        an especially rewarding experience performing for special needs students
        at the Black Mountain School. Band members also had a wonderful time
        visiting Canberra attractions such as Questacon, The National Portrait
        Gallery and Canberra Zoo.
      </p>
      <p>
        All members of the Sydney University Wind Orchestra are looking forward
        to 2013 and all it entails. On May 24th we have a spectacular concert
        featuring Ghost Train, by Eric Whitacre, at the Italian Forum Cultural
        Centre and November 1st will see the band celebrating its 10th
        anniversary with yet another spectacular concert. We look forward to
        seeing everyone there!
      </p>
    </Year>
  </main>
)

export default Page
