export const routes = {
  PROFILES: '/members',
  PROFILE: (handle: string) => `${routes.PROFILES}/${handle}`,
}
