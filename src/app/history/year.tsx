type YearProps = {
  year: number
  children: React.ReactNode
}

export const Year = ({ year, children }: YearProps) => (
  <div className="prose rounded-lg bg-gray-900 p-4">
    <h2 className="text-2xl">{year}</h2>

    {children}
  </div>
)
