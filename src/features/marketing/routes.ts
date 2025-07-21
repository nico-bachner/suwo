import { createURL } from '@/utils/http/create_url'

export const routes = {
  HISTORY: () => createURL({ path: ['history'] }),
  HISTORY_YEAR: (year: string) => createURL({ path: ['history', year] }),
  HOME: () => createURL({ path: [] }),
  MEMBERS: () => createURL({ path: ['members'] }),
  MEMBER: (handle: string) => createURL({ path: ['members', handle] }),
}
