export default function Page() {
  return (
    <main className="prose">
      <h1 className="text-center font-serif">
        The University of Sydney
        <br />
        Wind Orchestra
      </h1>

      <iframe
        src={`https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Australia%2FSydney&hl=en_GB&mode=AGENDA&src=${process.env.GOOGLE_CALENDAR_ID}&color=%23D81B60`}
        className="mx-auto h-full min-h-[360px] w-full max-w-screen-sm rounded-lg"
      />
    </main>
  )
}
