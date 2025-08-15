import { useEffect, useState } from 'react'

export const useShareableURL = (url: string) => {
  const [shareableURL, setShareableURL] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parsedURL = new URL(url, window.location.origin)
      setShareableURL(parsedURL.toString())
    }
  }, [url])

  return {
    shareableURL,
  }
}
