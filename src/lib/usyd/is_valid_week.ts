import { MAX_WEEK, MIN_WEEK } from './config'

export const isValidWeek = (week: number): boolean =>
  week >= MIN_WEEK && week <= MAX_WEEK
