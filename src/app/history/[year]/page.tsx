type PageProps = {
  params: Promise<{ year: string }>
}

export default async function Page({ params }: PageProps) {
  const { year } = await params

  return (
    <main className="prose p-6">
      <h2 className="text-2xl">{year}</h2>
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
    </main>
  )
}
