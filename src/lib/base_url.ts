const getBaseURL = () => {
  switch (process.env.VERCEL_ENV) {
    case 'production':
    case 'preview':
      if (!process.env.NEXT_PUBLIC_VERCEL_URL) {
        throw new Error(
          'NEXT_PUBLIC_VERCEL_URL is not defined in the environment variables.',
        )
      }

      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    case 'development':
    default:
      return 'http://localhost:3000'
  }
}

export const BASE_URL = getBaseURL()
