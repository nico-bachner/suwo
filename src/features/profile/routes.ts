export const routes = {
  PROFILES: '/members',
  PROFILE: (handle: string) => `${routes.PROFILES}/${handle}`,
  API_UPDATE_INSTRUMENT: '/api/profile/update-instrument',
}
