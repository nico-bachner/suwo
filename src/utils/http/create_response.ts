import { API_INDENT_SIZE } from '@/config'

import { JSONResponse } from './types'

export const createResponse = ({ status, body }: JSONResponse): Response =>
  new Response(JSON.stringify(body, null, API_INDENT_SIZE), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
