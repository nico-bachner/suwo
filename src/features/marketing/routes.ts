export const routes = {
  MEMBERS: '/members',
  MEMBER: (handle: string) => `${routes.MEMBERS}/${handle}`,
  HOME: '/',
  HISTORY: '/history',
  HISTORY_YEAR: (year: string) => `${routes.HISTORY}/${year}`,
}
