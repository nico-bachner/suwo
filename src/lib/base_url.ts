const getBaseURL = () => {
  switch (process.env.VERCEL_ENV) {
    case 'production':
    case 'preview':
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    case 'development':
      return 'http://localhost:3000'
    default:
      throw new Error('Unknown environment')
  }
}

export const BASE_URL = getBaseURL()
