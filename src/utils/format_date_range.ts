const DATE_FORMAT = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  dateStyle: 'medium',
})
const TIME_FORMAT = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  timeStyle: 'short',
})
const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  dateStyle: 'medium',
  timeStyle: 'short',
})

export const formatDateRange = (startsAt: Date, endsAt?: Date) => {
  if (!endsAt) {
    return DATE_TIME_FORMAT.format(startsAt)
  }

  if (
    startsAt.getFullYear() === endsAt.getFullYear() &&
    startsAt.getMonth() === endsAt.getMonth() &&
    startsAt.getDate() === endsAt.getDate()
  ) {
    return `${DATE_FORMAT.format(startsAt)}, ${TIME_FORMAT.format(startsAt)} – ${TIME_FORMAT.format(endsAt)}`
  }

  return `${DATE_TIME_FORMAT.format(startsAt)} – ${DATE_TIME_FORMAT.format(endsAt)}`
}
