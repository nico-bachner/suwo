import { createURL } from '@/utils/http/create_url'

export const routes = {
  SETTINGS: () => createURL({ path: ['settings'] }),
}
