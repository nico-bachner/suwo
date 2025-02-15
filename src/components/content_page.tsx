type ContentPageProps = {
  children: React.ReactNode
}

export const ContentPage = ({ children }: ContentPageProps) => (
  <main className="prose mx-auto w-fit">{children}</main>
)
