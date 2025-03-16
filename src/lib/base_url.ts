const getBaseURL = () => {
  switch (process.env.VERCEL_ENV) {
    case 'production':
    case 'preview':
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    case 'development':
    default:
      return 'http://localhost:3000'
  }
}

export const BASE_URL = getBaseURL()
