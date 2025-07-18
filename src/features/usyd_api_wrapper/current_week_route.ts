import { fetchCurrentWeek } from '@/lib/usyd/fetch_current_week'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'

export const GET = async () => {
  const currentWeek = await fetchCurrentWeek()

  return createResponse({
    status: StatusCode.OK,
    data: currentWeek,
  })
}
